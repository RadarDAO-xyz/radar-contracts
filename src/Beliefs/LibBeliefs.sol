// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {EditionsStructs} from "../Editions/EditionsStructs.sol";
import {IBeliefs} from "./IBeliefs.sol";

library LibBeliefs {
    function distributeFees(
        uint256 totalValue,
        uint256 editionId,
        uint256 editionCounter,
        mapping(uint256 => EditionsStructs.Edition) storage _editions,
        mapping(address => uint256) storage _balances
    ) internal {
        uint256 projectFee = totalValue / 2;
        uint256 poolFee = totalValue / 5;

        /// distribute to project
        _editions[editionId].balance += projectFee;

        /// distribute to other builders in pool
        string memory briefId = _editions[editionId].briefId;
        address[] memory builders = new address[](editionCounter);
        uint256 buildersCounter = 0;

        uint256 i = 0;
        for (; i < editionCounter && i != editionId; i++) {
            EditionsStructs.Edition memory edition = _editions[i];
            if (Strings.equal(edition.briefId, briefId)) {
                builders[buildersCounter] = edition.owner;
                buildersCounter += 1;
            }
        }
        if (builders.length > 0) {
            uint256 amount = poolFee / buildersCounter;
            for (i = 0; i < buildersCounter; i++) {
                _balances[builders[i]] += amount;
            }
        }
    }
}
