require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const SCROLL_RPC_URL = process.env.SCROLL_RPC_URL;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
	// defaultNetwork: "hardhat",
	solidity: "0.8.17",
	networks: {
		goerli: {
			url: GOERLI_RPC_URL,
			accounts: [WALLET_PRIVATE_KEY],
			chainId: 5,
		},
		scroll: {
			url: SCROLL_RPC_URL,
			accounts: [WALLET_PRIVATE_KEY],
			chainId: 534354,
		},
		localhost: {
			url: "http://127.0.0.1:8545/",
			chainId: 31337,
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
};
