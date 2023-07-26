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

error EditionNotCreated();
error EditionNotLaunched();
error EditionNotStopped();
error EditionFeeExceedsProtocolFee();
error EditionNotEnoughBalance();
error NotEditionOwner();
error NotEnoughFunds();
error TransactionFailed();

contract RadarEditions is
    Initializable,
    ERC1155Upgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable,
    ERC1155BurnableUpgradeable,
    ERC1155SupplyUpgradeable,
    UUPSUpgradeable
{
    enum EditionStatus {
        NotCreated,
        Created,
        Launched,
        Stopped
    }

    // TODO: optimise struct packing
    struct Edition {
        EditionStatus status;
        uint256 fee;
        uint256 balance;
        address owner;
    }

    event EditionApproved(uint256 editionId);
    event EditionCreated(uint256 editionId, uint256 fee, address owner);
    event EditionBalanceWithdrawn(uint256 editionId, uint256 amount, address owner);
    event EditionStopped(uint256 editionId);
    event EditionResumed(uint256 editionId);

    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 public protocolFee;
    // mapping of edition id to edition status
    mapping(uint256 => Edition) public launchedEditions;
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
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function setProtocolFee(uint256 _protocolFee) external onlyRole(DEFAULT_ADMIN_ROLE) {
        protocolFee = _protocolFee;
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
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

    function grantRole(bytes32 role, address account) public virtual override onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(role, account);
    }

    function approveEdition(uint256 editionId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (launchedEditions[editionId].status != EditionStatus.Created) {
            revert EditionNotCreated();
        }
        launchedEditions[editionId].status = EditionStatus.Launched;

        emit EditionApproved(editionId);
    }

    function withdrawFunds(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        (bool sent,) = msg.sender.call{value: amount}("");
        if (!sent) {
            revert TransactionFailed();
        }
    }

    /// edition owner methods

    function createEdition(uint256 fee) external returns (uint256 editionId) {
        if (fee > protocolFee) {
            revert EditionFeeExceedsProtocolFee();
        }
        editionId = editionCounter;
        launchedEditions[editionId] = Edition({status: EditionStatus.Created, fee: fee, balance: 0, owner: msg.sender});
        editionCounter++;

        emit EditionCreated(editionId, fee, msg.sender);
    }

    function withdrawEditionBalance(uint256 editionId, uint256 amount) external {
        if (launchedEditions[editionId].owner != msg.sender) {
            revert NotEditionOwner();
        }
        if (amount > launchedEditions[editionId].balance) {
            revert EditionNotEnoughBalance();
        }

        (bool sent,) = msg.sender.call{value: amount}("");
        if (!sent) {
            revert TransactionFailed();
        }
        launchedEditions[editionId].balance -= amount;

        emit EditionBalanceWithdrawn(editionId, amount, msg.sender);
    }

    function stopEdition(uint256 editionId) external {
        if (launchedEditions[editionId].owner != msg.sender) {
            revert NotEditionOwner();
        }
        if (launchedEditions[editionId].status != EditionStatus.Launched) {
            revert EditionNotLaunched();
        }

        launchedEditions[editionId].status = EditionStatus.Stopped;

        emit EditionStopped(editionId);
    }

    function resumeEdition(uint256 editionId) external {
        if (launchedEditions[editionId].owner != msg.sender) {
            revert NotEditionOwner();
        }
        if (launchedEditions[editionId].status != EditionStatus.Stopped) {
            revert EditionNotStopped();
        }

        launchedEditions[editionId].status = EditionStatus.Launched;

        emit EditionResumed(editionId);
    }

    /// user methods

    function mintEdition(uint256 editionId, uint256 amount, bytes memory data) external payable {
        if (launchedEditions[editionId].status != EditionStatus.Launched) {
            revert EditionNotLaunched();
        }
        if (msg.value < launchedEditions[editionId].fee * amount) {
            revert NotEnoughFunds();
        }

        _mint(msg.sender, editionId, amount, data);

        launchedEditions[editionId].balance += (msg.value - protocolFee);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

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
