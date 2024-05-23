// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {MoodNft} from "../../src/MoodNft.sol";
import {SvgConstants} from "../../constants/ImageUri.sol";

contract MoodNftTest is Test {
    using SvgConstants for *;

    MoodNft moodNft;

    address USER = makeAddr("USER");

    function setUp() public {
        moodNft = new MoodNft(SvgConstants.HAPPY_SVG_URI, SvgConstants.SAD_SVG_URI);
    }

    function testViewTokenUri() public {
        vm.prank(USER);
        moodNft.mintNft();
        console.log(moodNft.tokenURI(0));
    }
}