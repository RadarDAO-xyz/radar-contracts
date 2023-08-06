// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IRadarEditions} from "../interfaces/IRadarEditions.sol";

contract RadarEditionsStorage {
    IRadarEditions.Configuration public config;
}
