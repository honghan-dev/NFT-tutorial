// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";

contract Encoding is Test {
    function setUp() public {}

    function combineString() public view returns (string memory) {
        console.log(string(abi.encodePacked("Awesome", "Bro")));
    }
}
