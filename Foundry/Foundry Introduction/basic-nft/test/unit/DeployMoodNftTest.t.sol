// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {DeployMoodNft} from "../../script/DeployMoodNft.s.sol";
import {SvgConstants} from "../../constants/ImageUri.sol";

contract DeployMoodNftTest is Test {
    DeployMoodNft public deployMoodNft;
    using SvgConstants for *;
    
    function setUp() public {
        deployMoodNft = new DeployMoodNft();
    }

    function testConvertSvgToUri() public view {
        string memory happySvg = vm.readFile("./images/vacation.svg");
        string memory expectedUri = SvgConstants.HAPPY_SVG_URI;
        string memory actualUri = deployMoodNft.svgToImageUri(happySvg);

        assert(keccak256(abi.encodePacked(actualUri)) == keccak256(abi.encodePacked(expectedUri)));
    }
}