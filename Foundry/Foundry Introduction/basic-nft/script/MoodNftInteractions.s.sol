// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {MoodNft} from "../src/MoodNft.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";

contract MintMoodNft is Script {
    function run() external {
        address mostRecentDeployed = DevOpsTools.get_most_recent_deployment("MoodNft", block.chainid);
        mintNftOnContract(mostRecentDeployed);
    }

    function mintNftOnContract(address contractAddress) public {
        vm.startBroadcast();
        MoodNft(contractAddress).mintNft();
        vm.stopBroadcast();
    }
}

contract ChangeMoodNftTokenMood is Script {
    function run() external {
        address mostRecentDeployed = DevOpsTools.get_most_recent_deployment("MoodNft", block.chainid);
        changeNftMood(mostRecentDeployed);
    }

    function changeNftMood(address contractAddress) public {
        vm.startBroadcast();
        MoodNft(contractAddress).changeMood(0);
        vm.stopBroadcast();
    }
}
