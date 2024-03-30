import { ethers, run, network } from "hardhat";
import "dotenv/config";

const main = async () => {
	// Deploy contract
	const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();
	console.log("SimpleStorage deployed to:", simpleStorage.address);

	// Interact with contract
	const currentValue = await simpleStorage.retrieve();
	console.log("Current value:", currentValue);

	const transactionResponse = await simpleStorage.store(5);
	await transactionResponse.wait(1);
	const updatedValue = await simpleStorage.retrieve();
	console.log("Updated value: " + updatedValue);

	// Verify on etherscan only if contract not on hardhat and etherscan api key is set
	if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API) {
		await simpleStorage.deployTransaction.wait(6);
		await verify(simpleStorage.address, []);
	}
};

/**
 * Verify contract on etherscan
 * @param {*} contractAddress
 * @param {*} args
 */
const verify = async (contractAddress: string, args: any[]) => {
	console.log("Verifying contract at address:", contractAddress);

	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		if (error.message.toLower().includes("already verified")) {
			console.log("Contract already verified");
		} else {
			console.error(error);
		}
	}
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
