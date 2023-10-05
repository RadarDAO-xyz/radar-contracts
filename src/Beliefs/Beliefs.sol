// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {Editions} from "../Editions/Editions.sol";
import "../Editions/EditionsStructs.sol";
import "./IBeliefs.sol";

contract Beliefs is IBeliefs, Editions {
    /// fee used for beliefs
    uint256 public futureFundFee;

    /// user methods

    function believeProject(uint256 editionId, string memory tags) external payable override {
        if (msg.value < futureFundFee) {
            revert NotEnoughFunds();
        }
        if (editions[editionId].status != EditionsStructs.EditionStatus.Launched) {
            revert EditionNotLaunched();
        }

        uint256 projectFee = msg.value / 2;
        uint256 poolFee = msg.value / 5;

        /// distribute to project
        editions[editionId].balance += projectFee;

        /// distribute to other builders in pool
        string memory briefId = editions[editionId].briefId;
        address[] memory builders = new address[](editionCounter);
        uint256 buildersCounter = 0;

        uint256 i = 0;
        for (; i < editionCounter && i != editionId; i++) {
            EditionsStructs.Edition memory edition = editions[i];
            if (Strings.equal(edition.briefId, briefId)) {
                builders[buildersCounter] = edition.owner;
                buildersCounter += 1;
            }
        }
        if (builders.length > 0) {
            uint256 amount = poolFee / buildersCounter;
            for (i = 0; i < buildersCounter; i++) {
                balances[builders[i]] += amount;
            }
        }

        /// update belief data
        bool believerExists = false;
        for (i = 0; i < _believers.length; i++) {
            if (_believers[i] == msg.sender) {
                believerExists = _believers[i] == msg.sender;
                break;
            }
        }
        if (!believerExists) {
            _believers.push(msg.sender);
        }
        BitMaps.set(_beliefs[msg.sender], editionId);

        emit EditionBelieved(editionId, msg.sender, tags);
    }

    function removeBelief(uint256 editionId) external override {
        BitMaps.BitMap storage beliefs = _beliefs[msg.sender];
        if (!BitMaps.get(beliefs, editionId)) {
            revert NotCorrectUser();
        }
        BitMaps.unset(beliefs, editionId);
        emit EditionBeliefRemoved(editionId, msg.sender);
    }
}
