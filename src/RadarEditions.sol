// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Editions} from "./Editions/Editions.sol";
import {EditionsRoles} from "./Editions/EditionsRoles.sol";
import {IRadarEditions} from "./IRadarEditions.sol";

contract RadarEditions is Editions, IRadarEditions {
    function setURI(
        string memory newuri
    ) public override onlyRole(EditionsRoles.URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    /// admin methods

    function setProtocolFee(
        uint256 _protocolFee
    ) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        protocolFee = _protocolFee;
    }

    function setMaximumEditionFee(
        uint256 _maximumEditionFee
    ) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        maximumEditionFee = _maximumEditionFee;
    }
}
