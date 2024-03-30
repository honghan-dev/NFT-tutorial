const hre = require("hardhat");

const main = async () => {
	console.log("Deploying Staking Contract...");
	const Staking = await hre.ethers.getContractFactory("Staking");
	const staking = await Staking.deploy();

	console.log("Staking contract deployed to:", await staking.getAddress());
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
