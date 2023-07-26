// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {RadarEditions} from "../src/RadarEditions.sol";
import {RadarEditionsProxy} from "../src/RadarEditionsProxy.sol";

contract Deploy is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        RadarEditions implementation = new RadarEditions();
        RadarEditionsProxy proxy = new RadarEditionsProxy(address(implementation));

        vm.stopBroadcast();
    }
}
