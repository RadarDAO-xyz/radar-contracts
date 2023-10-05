// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {EditionsStructs} from "./Editions/EditionsStructs.sol";
import {EditionsRoles} from "./Editions/EditionsRoles.sol";
import {IEditions} from "./Editions/IEditions.sol";
import {IBeliefs} from "./Beliefs/IBeliefs.sol";

interface IRadarEditions {
    function setURI(string memory newuri) external;

    function setProtocolFee(uint256 _protocolFee) external;

    function setMaximumEditionFee(uint256 _maximumEditionFee) external;

    function setFutureFundFee(uint256 _futureFundFee) external;
}
