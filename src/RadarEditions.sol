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
    ERC1155SupplyUpgradeable
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

    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    uint256 public protocolFee;
    // TODO: change to bitmap for whether editions are launched
    // mapping of edition id to edition status
    mapping(uint256 => Edition) public launchedEditions;
    // counter to keep track of created editions
    uint256 public editionCounter;

    // id in 1155 used to refer to edition id

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(uint256 _protocolFee) {
        _disableInitializers();

        protocolFee = _protocolFee;
    }

    receive() external payable {}

    fallback() external payable {}

    function initialize() public initializer {
        __ERC1155_init("");
        __AccessControl_init();
        __Pausable_init();
        __ERC1155Burnable_init();
        __ERC1155Supply_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
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

    function addAdmin(address admin) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function approveEdition(uint256 editionId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (launchedEditions[editionId].status != EditionStatus.Created) {
            revert EditionNotCreated();
        }
        launchedEditions[editionId].status = EditionStatus.Launched;
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
    }

    function stopEdition(uint256 editionId) external {
        if (launchedEditions[editionId].owner != msg.sender) {
            revert NotEditionOwner();
        }
        if (launchedEditions[editionId].status != EditionStatus.Launched) {
            revert EditionNotLaunched();
        }

        launchedEditions[editionId].status = EditionStatus.Stopped;
    }

    function resumeEdition(uint256 editionId) external {
        if (launchedEditions[editionId].owner != msg.sender) {
            revert NotEditionOwner();
        }
        if (launchedEditions[editionId].status != EditionStatus.Stopped) {
            revert EditionNotStopped();
        }

        launchedEditions[editionId].status = EditionStatus.Launched;
    }

    /// user methods

    function mintEdition(uint256 editionId, uint256 amount) external payable {
        if (launchedEditions[editionId].status != EditionStatus.Launched) {
            revert EditionNotLaunched();
        }
        if (msg.value < launchedEditions[editionId].fee * amount) {
            revert NotEnoughFunds();
        }

        _mint(msg.sender, editionId, amount, bytes(""));
        launchedEditions[editionId].balance += msg.value;
    }

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
