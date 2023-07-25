// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {RadarEditions} from "../src/RadarEditions.sol";
import {RadarEditionsProxy} from "../src/RadarEditionsProxy.sol";

contract RadarEditionsTest is Test {
    RadarEditions public implementation;
    RadarEditionsProxy public proxy;
    address private owner;

    function setUp() public {
        owner = vm.addr(1);

        implementation = new RadarEditions();
        proxy = new RadarEditionsProxy(address(implementation));
    }

    function test_initializable() external {
        (bool success,) = address(proxy).call(abi.encodeWithSignature("initialize(address)", owner));
        assertFalse(success);
    }
}
