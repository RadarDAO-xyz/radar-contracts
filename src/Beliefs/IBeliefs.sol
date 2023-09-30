// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IBeliefs {
    event EditionBelieved(uint256 indexed editionId, address indexed believer, string tags);
    event EditionBeliefRemoved(uint256 indexed editionId, address indexed believer);

    function believeProject(uint256 editionId, string memory tags) external;

    function removeBelief(uint256 editionId) external;
}
