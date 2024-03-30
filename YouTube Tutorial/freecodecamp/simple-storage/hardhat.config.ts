import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "@nomiclabs/hardhat-ethers";
import "./tasks/block-number";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@typechain/hardhat";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	defaultNetwork: "hardhat",
	solidity: "0.8.18",
	networks: {
		goerli: {
			url: process.env.GOERLI_URL || "",
			accounts: [process.env.PRIVATE_KEY || ""],
			chainId: 5,
		},
		localhost: {
			url: "http://127.0.0.1:8545",
			chainId: 31337,
		},
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API || "key",
	},
	gasReporter: {
		enabled: false,
		// outputFile: "gas-report.txt",
		// noColors: true,
		currency: "USD",
		coinmarketcap: process.env.COINMARKETCAP_API,
		token: "MATIC",
	},
};
