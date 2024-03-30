require("hardhat-deploy");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.18",
	networks: {
		sepolia: {
			chainId: 11155111,
			url: process.env.SEPOLIA_URL,
			accounts: [process.env.PRIVATE_KEY],
		},
	},
};
