// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title Interface for belief related methods
/// @author marcuspang.eth
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
interface IBeliefs {
    event EditionBelieved(uint256 indexed editionId, address indexed believer, string tags);
    event EditionBeliefRemoved(uint256 indexed editionId, address indexed believer);

    /// @notice Believe in a project and distribute funds to the project and other projects in the same pool
    /// @dev Remaining fees are distributed to RADAR
    /// @param editionId The specified edition to believe in
    /// @param tags The tags that the project is involved with
    function believeProject(uint256 editionId, string memory tags) external payable;

    /// @notice Removes belief from a project
    /// @dev Funds are not re-distributed back to the user
    /// @param editionId The specified edition to remove belief from
    function removeBelief(uint256 editionId) external;
}
