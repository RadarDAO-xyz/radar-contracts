// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IBeliefs} from "../Beliefs/IBeliefs.sol";
import {EditionsStructs} from "./EditionsStructs.sol";
import {EditionsRoles} from "./EditionsRoles.sol";

interface IEditions is IBeliefs {
    event EditionApproved(uint256 editionId);
    event EditionCreated(
        uint256 editionId,
        string briefId,
        uint256 fee,
        address owner
    );
    event EditionBalanceWithdrawn(
        uint256 editionId,
        uint256 amount,
        address owner
    );
    event EditionStopped(uint256 editionId);
    event EditionResumed(uint256 editionId);

    /// view methods
    function getEditions()
        external
        view
        returns (EditionsStructs.Edition[] memory);

    function getBalances(
        address owner
    ) external view returns (EditionsStructs.EditionIdWithAmount[] memory);

    /// admin methods

    function approveEdition(uint256 editionId) external;

    function withdrawFunds(uint256 amount) external;

    function updateEdition(
        uint256 editionId,
        string memory id,
        string memory briefId
    ) external;

    /// edition owner methods

    function createEdition(
        uint256 fee,
        address owner,
        address payer,
        string memory id,
        string memory briefId
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
