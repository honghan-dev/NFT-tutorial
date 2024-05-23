// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {BasicNft} from "../../src/BasicNft.sol";
import {DeployBasicNft} from "../../script/DeployBasicNft.s.sol";

contract BasicNftTest is Test {
    DeployBasicNft public deployBasicNft;
    BasicNft public basicNft;
    address public USER = makeAddr("USER");
    string public constant DOG =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

    function setUp() external {
        deployBasicNft = new DeployBasicNft();
        basicNft = deployBasicNft.run();
    }

    function testNameIsCorrect() public view {
        string memory expectedName = "DogWoof";
        string memory actualName = basicNft.name();
        bytes32 expectedNameHashed = keccak256(abi.encodePacked(expectedName));
        bytes32 actualNameHashed = keccak256(abi.encodePacked(actualName));
        assert(expectedNameHashed == actualNameHashed);
    }

    function testCanMintAndCheckBalance() external {
        vm.prank(USER);
        basicNft.mintNft(DOG);
        // Check if user has 1 token
        assert(basicNft.balanceOf(USER) == 1);
        // Check if IPFS token uri is correct
        assert(keccak256(abi.encodePacked(DOG)) == keccak256(abi.encodePacked(basicNft.tokenURI(0))));
    }
}
