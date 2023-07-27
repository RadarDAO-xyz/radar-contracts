// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/console.sol";
import "forge-std/Script.sol";

import {RadarEditions} from "../src/RadarEditions.sol";
import {RadarEditionsProxy} from "../src/RadarEditionsProxy.sol";

contract Deploy is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        RadarEditions implementation = new RadarEditions();
        RadarEditionsProxy proxy = new RadarEditionsProxy(address(implementation));

        // (bool success,) = address(proxy).call(
        //     abi.encodeWithSignature("initialize(address)", 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)
        // );
        // require(success);

        (bool success, bytes memory data) =
            address(proxy).call(abi.encodeWithSignature("setProtocolFee(uint256)", 1000000));
        require(success);

        (success, data) = address(proxy).call(abi.encodeWithSignature("protocolFee()"));
        require(success);

        console.log(string(data));

        // console.log(implementation.protocolFee());

        vm.stopBroadcast();
    }
}
