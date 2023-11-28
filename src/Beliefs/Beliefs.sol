// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {Editions} from "../Editions/Editions.sol";
import {LibBeliefs} from "./LibBeliefs.sol";
import "../Editions/EditionsStructs.sol";
import "./IBeliefs.sol";

contract Beliefs is IBeliefs, Editions {
    // mapping of users to projects they believe in
    mapping(address user => BitMaps.BitMap beliefs) internal _beliefs;
    // array of users who have believed in some project
    address[] internal _believers;
    // mapping of users and their current balance
    mapping(address user => uint256 balance) public balances;
    /// fee used for beliefs
    uint256 public futureFundFee;

    /// view methods
    function getUserBeliefs(address user) external view override returns (bool[] memory) {
        bool[] memory beliefs = new bool[](editionCounter);
        for (uint256 i = 0; i < editionCounter; i++) {
            beliefs[i] = BitMaps.get(_beliefs[user], i);
        }
        return beliefs;
    }

    /// user methods
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
                believerExists = true;
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

    function retrieveBalance(uint256 amount) external override {
        uint256 balance = balances[msg.sender];
        if (amount > balance) {
            revert NotEnoughFunds();
        }

        balances[msg.sender] -= amount;

        (bool sent,) = msg.sender.call{value: amount}("");
        if (!sent) {
            revert TransactionFailed();
        }
        emit BalanceRetrieved(msg.sender, amount);
    }
}
