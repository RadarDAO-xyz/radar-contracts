// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC1967Upgrade} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol";
import {Proxy} from "@openzeppelin/contracts/proxy/Proxy.sol";

error InvalidImplementation();

contract RadarEditionsProxy is Proxy, ERC1967Upgrade {
    address immutable defaultImplementation;

    constructor(address _defaultImplementation) {
        if (_defaultImplementation == address(0)) {
            revert InvalidImplementation();
        }
        defaultImplementation = _defaultImplementation;
    }

    function initialize() external {
        address implementation = ERC1967Upgrade._getImplementation();

        if (implementation == address(0)) {
            ERC1967Upgrade._upgradeTo(defaultImplementation);
        }
    }

    function _implementation() internal view override returns (address) {
        return ERC1967Upgrade._getImplementation();
    }
}
