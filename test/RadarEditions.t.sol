// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/RadarEditions.sol";

contract RadarEditionsTest is Test {
    RadarEditions public radarEditions;

    function setUp() public {
        radarEditions = new RadarEditions(0);
    }
}
