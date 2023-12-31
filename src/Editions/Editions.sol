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

import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {EditionsRoles} from "./EditionsRoles.sol";
import {IEditions} from "./IEditions.sol";
import "./EditionsStructs.sol";

contract Editions is
    IEditions,
    Initializable,
    ERC1155Upgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable,
    ERC1155BurnableUpgradeable,
    ERC1155SupplyUpgradeable,
    UUPSUpgradeable
{
    uint256 public protocolFee;
    // mapping of edition id to edition status
    mapping(uint256 => EditionsStructs.Edition) public editions;
    // counter to keep track of created editions
    uint256 public editionCounter;

    uint256 public maximumEditionFee;

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

    /// view methods

    function getEditions() external view override returns (EditionsStructs.Edition[] memory) {
        EditionsStructs.Edition[] memory _editions = new EditionsStructs.Edition[](editionCounter);
        for (uint256 i = 0; i < editionCounter; i++) {
            _editions[i] = editions[i];
        }
        return _editions;
    }

    function getBalances(address owner) external view override returns (EditionsStructs.EditionIdWithAmount[] memory) {
        EditionsStructs.EditionIdWithAmount[] memory _balances = new EditionsStructs.EditionIdWithAmount[](
                editionCounter
            );
        for (uint256 i = 0; i < editionCounter; i++) {
            _balances[i] = EditionsStructs.EditionIdWithAmount({id: editions[i].id, amount: balanceOf(owner, i)});
        }
        return _balances;
    }

    /// admin methods

    function grantRole(bytes32 role, address account) public virtual override onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(role, account);
    }

    function approveEdition(uint256 editionId) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        if (editions[editionId].status != EditionsStructs.EditionStatus.Created) {
            revert EditionNotCreated();
        }
        editions[editionId].status = EditionsStructs.EditionStatus.Launched;

        emit EditionApproved(editionId);
    }

    function updateEdition(uint256 editionId, string memory id, string memory briefId)
        external
        override
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        if (editions[editionId].status == EditionsStructs.EditionStatus.NotCreated) {
            revert EditionNotCreated();
        }
        editions[editionId].id = id;
        editions[editionId].briefId = briefId;
    }

    function mintEdition(uint256 editionId, uint256 amount, address buyer, bytes memory data)
        external
        payable
        override
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        if (editions[editionId].status != EditionsStructs.EditionStatus.Launched) {
            revert EditionNotLaunched();
        }
        if (msg.value < (editions[editionId].fee + protocolFee) * amount) {
            revert NotEnoughFunds();
        }

        _mint(buyer, editionId, amount, data);

        editions[editionId].balance += msg.value - amount * protocolFee;
    }

    /// edition owner methods

    function createEdition(uint256 fee, address owner, address payer, string memory id, string memory briefId)
        external
        override
        returns (uint256 editionId)
    {
        if (fee > maximumEditionFee) {
            revert EditionFeeExceedsMaximumFee();
        }
        editionId = editionCounter;
        editions[editionId] = EditionsStructs.Edition({
            status: EditionsStructs.EditionStatus.Created,
            fee: fee,
            balance: 0,
            owner: owner,
            id: id,
            briefId: briefId
        });
        editionCounter++;

        emit EditionCreated(editionId, briefId, fee, owner);
    }

    function withdrawEditionBalance(uint256 editionId, uint256 amount) external override {
        if (editions[editionId].owner != msg.sender) {
            revert NotEditionOwner();
        }
        if (amount > editions[editionId].balance) {
            revert EditionNotEnoughBalance();
        }

        editions[editionId].balance -= amount;

        (bool sent,) = msg.sender.call{value: amount}("");
        if (!sent) {
            revert TransactionFailed();
        }

        emit EditionBalanceWithdrawn(editionId, amount, msg.sender);
    }

    function withdrawFromAllEditionBalance() external override {
        uint256 totalBalance = 0;
        for (uint256 i = 0; i < editionCounter; i++) {
            if (editions[i].owner == msg.sender) {
                totalBalance += editions[i].balance;
                editions[i].balance = 0;
            }
        }
        if (totalBalance == 0) {
            revert EditionNotEnoughBalance();
        }

        (bool sent,) = msg.sender.call{value: totalBalance}("");
        if (!sent) {
            revert TransactionFailed();
        }

        emit EditionBalanceWithdrawnFromAll(totalBalance, msg.sender);
    }

    function stopEdition(uint256 editionId) external override {
        if (!(editions[editionId].owner == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender))) {
            revert NotEditionOwner();
        }
        if (editions[editionId].status != EditionsStructs.EditionStatus.Launched) {
            revert EditionNotLaunched();
        }

        editions[editionId].status = EditionsStructs.EditionStatus.Stopped;

        emit EditionStopped(editionId);
    }

    function resumeEdition(uint256 editionId) external override {
        if (!(editions[editionId].owner == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender))) {
            revert NotEditionOwner();
        }
        if (editions[editionId].status != EditionsStructs.EditionStatus.Stopped) {
            revert EditionNotStopped();
        }

        editions[editionId].status = EditionsStructs.EditionStatus.Launched;

        emit EditionResumed(editionId);
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
