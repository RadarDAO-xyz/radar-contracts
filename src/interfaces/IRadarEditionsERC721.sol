// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {RadarEditionsConstants} from "../storage/RadarEditionsConstants.sol";

interface IRadarEditions {
    error EditionNotCreated();
    error EditionNotLaunched();
    error EditionNotStopped();
    error EditionFeeExceedsMaximumFee();
    error EditionNotEnoughBalance();
    error NotEditionOwner();
    error NotEnoughFunds();
    error TransactionFailed();

    event EditionApproved(uint256 editionId);
    event EditionCreated(uint256 editionId, uint256 fee, address owner);
    event EditionBalanceWithdrawn(
        uint256 editionId,
        uint256 amount,
        address owner
    );
    event EditionStopped(uint256 editionId);
    event EditionResumed(uint256 editionId);

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
        // @dev 12byte MongoDB ObjectId
        uint96 id;
    }

    struct EditionIdWithAmount {
        string id;
        uint256 amount;
    }

    struct Configuration {
        // @dev (uint160)
        address payable fundsRecepient;
        // @dev (uint160 + 64 = 224)
        uint64 royalty;
    }

    function setURI(string memory newuri) external;

    function setProtocolFee(uint256 _protocolFee) external;

    function setMaximumEditionFee(uint256 _maximumEditionFee) external;

    function getEditions() external view returns (Edition[] memory);

    function getBalances(
        address owner
    ) external view returns (EditionIdWithAmount[] memory);

    /// admin methods

    function approveEdition(uint256 editionId) external;

    function withdrawFunds(uint256 amount) external;

    /// edition owner methods

    function createEdition(
        uint256 fee,
        address owner,
        address payer,
        string memory id
    ) external returns (uint256 editionId);

    function withdrawEditionBalance(uint256 editionId, uint256 amount) external;

    function stopEdition(uint256 editionId) external;

    function resumeEdition(uint256 editionId) external;

    /// user methods

    function mintEdition(
        uint256 editionId,
        uint256 amount,
        address buyer,
        bytes memory data
    ) external payable;
}
