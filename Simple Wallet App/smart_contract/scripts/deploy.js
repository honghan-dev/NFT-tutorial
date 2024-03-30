// Using etheresjs wrapped in hardhat.
const { ethers, run, network } = require("hardhat");

const main = async () => {
	const Transactions = await ethers.getContractFactory("Transactions");
	const transactions = await Transactions.deploy();

	// To wait contract to be deloyed.
	await transactions.deployed();
	console.log("Deployed to", transactions.address);
	if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
		await transactions.deployTransaction.wait(6);
		await verify(transactions.address, []);
	}
	console.log(network.config);
};

// Verify on goerli etherscan
// const verify = async (contractAddress, args) => {
// 	console.log("Verifying...");
// 	try {
// 		await run("verify:verify", {
// 			address: contractAddress,
// 			constructorArguments: args,
// 		});
// 	} catch (error) {
// 		if (error.message.toLowerCase().includes("already verified")) {
// 			console.log("Already verified");
// 		} else {
// 			console.log(error);
// 		}
// 	}
// };

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

runMain();
