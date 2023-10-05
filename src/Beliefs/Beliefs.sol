// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {Editions} from "../Editions/Editions.sol";
import {LibBeliefs} from "./LibBeliefs.sol";
import "../Editions/EditionsStructs.sol";
import "./IBeliefs.sol";

contract Beliefs is IBeliefs, Editions {
    /// fee used for beliefs
    uint256 public futureFundFee;
    // mapping of users to projects they believe in
    mapping(address user => BitMaps.BitMap beliefs) internal _beliefs;
    // array of users who have believed in some project
    address[] internal _believers;
    // mapping of users and their current balance
    mapping(address user => uint256 balance) public balances;

    function believeProject(uint256 editionId, string memory tags) external payable override {
        if (msg.value < futureFundFee) {
            revert NotEnoughFunds();
        }
        if (editions[editionId].status != EditionsStructs.EditionStatus.Launched) {
            revert EditionNotLaunched();
        }

        LibBeliefs.distributeFees(msg.value, editionId, editionCounter, editions, balances);

        /// update belief data
        bool believerExists = false;
        for (uint256 i = 0; i < _believers.length; i++) {
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
