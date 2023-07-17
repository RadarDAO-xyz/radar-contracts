// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract RadarEditions {
    uint256 public protocolFee;
    // add bitmap for whether editions are launched
    // id in 1155 used to refer to edition id

    constructor(uint256 _protocolFee) {
        protocolFee = _protocolFee;
    }

    /// Admin methods

    /// @notice Approves the specified project, only by contract owner
    // TODO: allow other admins?
    function approveEdition(uint256 editionId) external {}

    function launchEdition(uint256 editionId) external {}

    function withdrawFunds() external {}

    /// edition owner methods

    function createEdition() external {}

    /// user methods

    function mintEdition(uint256 editionId) external payable {}
}
