const hre = require("hardhat");

async function main() {
	console.log("deploying...");
	const MarketInteractions = await hre.ethers.getContractFactory(
		"MarketInteractions"
	);
	const marketInteractions = await MarketInteractions.deploy(
		"0xC911B590248d127aD18546B186cC6B324e99F02c"
	);

	await marketInteractions.deployed();

	console.log("MarketInteractions deployed to:", marketInteractions.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
