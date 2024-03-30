const { expect } = require("chai");
const { ethers } = require("hardhat");

const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("SingleSwap", () => {
	let singleSwapToken;
	let accounts;
	let weth;
	let dai;
	let usdc;
	const swapRouter = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

	// This is a Mocha function that runs before each test
	beforeEach(async () => {
		// Get the ContractFactory and Signers here.
		accounts = await ethers.getSigners(1);

		const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
		singleSwapToken = await SingleSwapToken.deploy(swapRouter);

		await singleSwapToken.deployed();

		weth = await ethers.getContractAt("IWETH", WETH9);
		dai = await ethers.getContractAt("IERC20", DAI);
		usdc = await ethers.getContractAt("IERC20", USDC);
	});

	// Swap exact input amount
	it("swapExactInputSingle", async () => {
		// const amountIn = ethers.utils.parseEther("1");
		const amountIn = 10n ** 18n;

		// Deposit WETH
		console.log("Depositing");
		await weth.deposit({ value: amountIn });
		await weth.approve(singleSwapToken.address, amountIn);
		console.log("Deposited", await weth.balanceOf(accounts[0].address));

		// Swap
		console.log("Swapping");
		await singleSwapToken.swapExactInputSingle(amountIn);
		console.log("Swap completed");
		console.log(
			"WETH balance",
			await await weth.balanceOf(accounts[0].address)
		);
		console.log("DAI balance", await dai.balanceOf(accounts[0].address));
	});

	// Swap exact output amount
	it("swapExactOutputSingle", async () => {
		const wethAmountInMax = 10n ** 18n;
		const daiAmountOut = 100n * 10n ** 18n;

		// Deposit WETH
		await weth.deposit({ value: wethAmountInMax });
		await weth.approve(singleSwapToken.address, wethAmountInMax);

		// Swap
		await singleSwapToken.swapExactOutputSingle(daiAmountOut, wethAmountInMax);
		console.log("DAI balance", await dai.balanceOf(accounts[0].address));
	});
});
