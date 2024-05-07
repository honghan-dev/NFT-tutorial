// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract Encoding {
    function combineString() public pure returns (string memory) {
        return string(abi.encodePacked("Awesome", "Bro"));
    }
}
