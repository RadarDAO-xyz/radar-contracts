// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import {ERC1155BurnableUpgradeable} from
    "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import {ERC1155SupplyUpgradeable} from
    "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "./EditionsStructs.sol";
import "./EditionsRoles.sol";

contract RadarEditions is
    Initializable,
    ERC1155Upgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable,
    ERC1155BurnableUpgradeable,
    ERC1155SupplyUpgradeable,
    UUPSUpgradeable
{
    event EditionApproved(uint256 editionId);
    event EditionCreated(uint256 editionId, uint256 fee, address owner);
    event EditionBalanceWithdrawn(uint256 editionId, uint256 amount, address owner);
    event EditionStopped(uint256 editionId);
    event EditionResumed(uint256 editionId);

    uint256 public protocolFee;
    // mapping of edition id to edition status
    mapping(uint256 => EditionsStructs.Edition) public editions;
    // counter to keep track of created editions
    uint256 public editionCounter;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    receive() external payable {}

    fallback() external payable {}

    function initialize() public initializer {
        __ERC1155_init("");
        __AccessControl_init();
        __Pausable_init();
        __ERC1155Burnable_init();
        __ERC1155Supply_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(EditionsRoles.URI_SETTER_ROLE, msg.sender);
        _grantRole(EditionsRoles.PAUSER_ROLE, msg.sender);
        _grantRole(EditionsRoles.UPGRADER_ROLE, msg.sender);
    }

    function setURI(string memory newuri) public onlyRole(EditionsRoles.URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function setProtocolFee(uint256 _protocolFee) external onlyRole(DEFAULT_ADMIN_ROLE) {
        protocolFee = _protocolFee;
    }

    function pause() public onlyRole(EditionsRoles.PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(EditionsRoles.PAUSER_ROLE) {
        _unpause();
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155Upgradeable, ERC1155SupplyUpgradeable) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function getEditions() external view returns (EditionsStructs.Edition[] memory) {
        EditionsStructs.Edition[] memory _editions = new EditionsStructs.Edition[](editionCounter);
        for (uint256 i = 0; i < editionCounter; i++) {
            _editions[i] = editions[i];
        }
        return _editions;
    }

    function getBalances(address owner) external view returns (EditionsStructs.EditionIdWithAmount[] memory) {
        EditionsStructs.EditionIdWithAmount[] memory balances =
            new EditionsStructs.EditionIdWithAmount[](editionCounter);
        for (uint256 i = 0; i < editionCounter; i++) {
            balances[i] = EditionsStructs.EditionIdWithAmount({id: editions[i].id, amount: balanceOf(owner, i)});
        }
        return balances;
    }

    /// admin methods

    function grantRole(bytes32 role, address account) public virtual override onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(role, account);
    }

    function approveEdition(uint256 editionId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (editions[editionId].status != EditionsStructs.EditionStatus.Created) {
            revert EditionNotCreated();
        }
        editions[editionId].status = EditionsStructs.EditionStatus.Launched;

        emit EditionApproved(editionId);
    }

    function withdrawFunds(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        (bool sent,) = msg.sender.call{value: amount}("");
        if (!sent) {
            revert TransactionFailed();
        }
    }

    /// edition owner methods

    function createEdition(uint256 fee, address owner, address payer, string memory id)
        external
        returns (uint256 editionId)
    {
        if (fee > protocolFee) {
            revert EditionFeeExceedsProtocolFee();
        }
        editionId = editionCounter;
        editions[editionId] = EditionsStructs.Edition({
            status: EditionsStructs.EditionStatus.Created,
            fee: fee,
            balance: 0,
            owner: owner,
            id: id
        });
        editionCounter++;

        emit EditionCreated(editionId, fee, owner);
    }

    function withdrawEditionBalance(uint256 editionId, uint256 amount) external {
        if (editions[editionId].owner != msg.sender) {
            revert NotEditionOwner();
        }
        if (amount > editions[editionId].balance) {
            revert EditionNotEnoughBalance();
        }

        (bool sent,) = msg.sender.call{value: amount}("");
        if (!sent) {
            revert TransactionFailed();
        }
        editions[editionId].balance -= amount;

        emit EditionBalanceWithdrawn(editionId, amount, msg.sender);
    }

    function stopEdition(uint256 editionId) external {
        if (editions[editionId].owner != msg.sender) {
            revert NotEditionOwner();
        }
        if (editions[editionId].status != EditionsStructs.EditionStatus.Launched) {
            revert EditionNotLaunched();
        }

        editions[editionId].status = EditionsStructs.EditionStatus.Stopped;

        emit EditionStopped(editionId);
    }

    function resumeEdition(uint256 editionId) external {
        if (editions[editionId].owner != msg.sender) {
            revert NotEditionOwner();
        }
        if (editions[editionId].status != EditionsStructs.EditionStatus.Stopped) {
            revert EditionNotStopped();
        }

        editions[editionId].status = EditionsStructs.EditionStatus.Launched;

        emit EditionResumed(editionId);
    }

    /// user methods

    function mintEdition(uint256 editionId, uint256 amount, address buyer, bytes memory data) external payable {
        if (editions[editionId].status != EditionsStructs.EditionStatus.Launched) {
            revert EditionNotLaunched();
        }
        if (msg.value < editions[editionId].fee * amount) {
            revert NotEnoughFunds();
        }

        _mint(buyer, editionId, amount, data);

        editions[editionId].balance += (msg.value - protocolFee);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(EditionsRoles.UPGRADER_ROLE) {}

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
