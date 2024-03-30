require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.10",
	networks: {
		goerli: {
			url: process.env.GOERLI_URL,
			accounts: [process.env.PRIVATE_KEY],
		},
	},
};

// Deployed contract- 0x6BdA559603bd19a16a0D2371f1fE16CffBfaB467
