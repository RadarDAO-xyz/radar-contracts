// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {Editions} from "./Editions/Editions.sol";
import {EditionsRoles} from "./Editions/EditionsRoles.sol";
import {IRadarEditions} from "./IRadarEditions.sol";

contract RadarEditions is Editions, IRadarEditions {
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
}
