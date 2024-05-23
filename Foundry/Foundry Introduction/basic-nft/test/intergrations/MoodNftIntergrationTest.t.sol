// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console} from "forge-std/Test.sol";
import {Base64} from "openzeppelin-contracts/contracts/utils/Base64.sol";
import {MoodNft} from "../../src/MoodNft.sol";
import {DeployMoodNft} from "../../script/DeployMoodNft.s.sol";
import {SvgConstants} from "../../constants/ImageUri.sol";

contract MoodNftIntergrationTest is Test {
    using SvgConstants for *;

    DeployMoodNft public deployMoodNft;
    MoodNft public moodNft;
    address public USER = makeAddr("USER");

    function setUp() external {
        deployMoodNft = new DeployMoodNft();
        moodNft = deployMoodNft.run();
    }

    function testNameIsCorrect() public view {
        string memory expectedName = "Moods";
        string memory actualName = moodNft.name();
        bytes32 expectedNameHashed = keccak256(abi.encodePacked(expectedName));
        bytes32 actualNameHashed = keccak256(abi.encodePacked(actualName));
        assert(expectedNameHashed == actualNameHashed);
    }

    function testCanMintAndCheckBalanceIntergration() external {
        vm.prank(USER);
        moodNft.mintNft();
        // Check if user has 1 token
        assert(moodNft.balanceOf(USER) == 1);
    }

    function generateTokenURI(string memory imageURI, string memory name) internal pure returns (string memory) {
    bytes memory tokenMetadata = 
        bytes(abi.encodePacked(
            '{"name":"',
            name,
            '", "description":"An NFT that changes with your mood, 100% on Chain", ',
            '"attributes": [{"trait_type": "colorness", "value": 100}], "image":"',
            imageURI,
            '"}'
        ));
    string memory based64EncodedURI = Base64.encode(tokenMetadata);
    string memory finalURI = string(abi.encodePacked("data:application/json;base64,", based64EncodedURI));

    return finalURI;
}

    function testChangeTokenMood() public {
        vm.startPrank(USER);
        // Mint nft
        moodNft.mintNft();
        // Change mood
        moodNft.changeMood(0);
        vm.stopPrank();
        string memory expectedTokenURI = generateTokenURI(SvgConstants.SAD_SVG_URI, moodNft.name());
        string memory actualTokenUri = moodNft.tokenURI(0);
        console.log(expectedTokenURI);
        console.log(actualTokenUri);

        assert(keccak256(abi.encodePacked(expectedTokenURI)) == keccak256(abi.encodePacked(actualTokenUri)));
    }
}
