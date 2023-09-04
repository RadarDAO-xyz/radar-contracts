// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/console.sol";
import "forge-std/Test.sol";

import "../src/EditionsStructs.sol";
import {RadarEditions} from "../src/RadarEditions.sol";
import {RadarEditionsProxy} from "../src/RadarEditionsProxy.sol";

contract RadarEditionsTest is Test {
    RadarEditions public implementation;
    RadarEditionsProxy public proxy;
    address private owner;
    uint256 private protocolFee;

    function setUp() public {
        owner = vm.addr(1);
        protocolFee = 1_000_000;

        vm.startBroadcast(owner);
        implementation = new RadarEditions();
        proxy = new RadarEditionsProxy(address(implementation));

        (bool success,) = address(proxy).call(abi.encodeWithSignature("setProtocolFee(uint256)", protocolFee));
        assertTrue(success);

        vm.stopBroadcast();
    }

    function test_initializable() external {
        (bool success,) = address(proxy).call(abi.encodeWithSignature("initialize(address)", owner));
        assertTrue(success);
    }

    function test_createEdition(uint256 fee) external {
        address user = vm.addr(2);

        console.log(fee, protocolFee);
        vm.prank(user);
        (bool success,) = address(proxy).call(abi.encodeWithSignature("createEdition(uint256)", fee));
        assertTrue(success);

        assertEq(implementation.editionCounter(), 1);

        (EditionsStructs.EditionStatus status, uint256 _fee, uint256 balance, address _owner,) =
            implementation.editions(0);

        assertEq(uint256(status), uint256(EditionsStructs.EditionStatus.Created));
        assertEq(_fee, fee);
        assertEq(balance, 0);
        assertEq(_owner, user);
    }
}
