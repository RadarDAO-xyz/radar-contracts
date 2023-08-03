// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

error EditionNotCreated();
error EditionNotLaunched();
error EditionNotStopped();
error EditionFeeExceedsMaximumFee();
error EditionNotEnoughBalance();
error NotEditionOwner();
error NotEnoughFunds();
error TransactionFailed();

contract EditionsStructs {
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
        string id;
    }

    struct EditionIdWithAmount {
        string id;
        uint256 amount;
    }
}
