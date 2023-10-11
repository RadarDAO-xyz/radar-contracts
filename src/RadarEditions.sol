// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {Beliefs} from "./Beliefs/Beliefs.sol";
import {EditionsRoles} from "./Editions/EditionsRoles.sol";
import {IRadarEditions} from "./IRadarEditions.sol";
import {TransactionFailed, NotEnoughFunds, NotEnoughFees} from "./Editions/EditionsStructs.sol";

contract RadarEditions is IRadarEditions, Beliefs {
    function contractURI() public view returns (string memory) {
        return "https://radarlaunch.app/api/metadata";
    }

    function uri(uint256 id) public view override returns (string memory) {
        return string.concat(super.uri(id), Strings.toString(id));
    }

    function setURI(string memory newuri) public override onlyRole(EditionsRoles.URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    /// admin methods

    function setProtocolFee(uint256 _protocolFee) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        protocolFee = _protocolFee;
    }

    function setMaximumEditionFee(uint256 _maximumEditionFee) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        maximumEditionFee = _maximumEditionFee;
    }

    function setFutureFundFee(uint256 _futureFundFee) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        futureFundFee = _futureFundFee;
    }

    function withdrawFunds(uint256 amount) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        if (amount > address(this).balance) {
            revert NotEnoughFunds();
        }
        uint256 i = 0;
        uint256 withdrawableAmount = address(this).balance;
        for (; i < editionCounter; i++) {
            withdrawableAmount -= editions[i].balance;
            if (withdrawableAmount < amount) {
                revert NotEnoughFees();
            }
        }
        for (i = 0; i < _believers.length; i++) {
            withdrawableAmount -= balances[_believers[i]];
            if (withdrawableAmount < amount) {
                revert NotEnoughFees();
            }
        }

        (bool sent,) = msg.sender.call{value: amount}("");
        if (!sent) {
            revert TransactionFailed();
        }
    }
}
