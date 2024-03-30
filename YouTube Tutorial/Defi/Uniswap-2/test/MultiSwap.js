const { expect } = require("chai");
const { ethers } = require("hardhat");

const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("MultiSwap", () => {
	let multiSwapToken;
	let accounts;
	let weth;
	let dai;
	let usdc;
	const swapRouter = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

	// This is a Mocha function that runs before each test
	beforeEach(async () => {
		// Get the ContractFactory and Signers here.
		accounts = await ethers.getSigners(1);

		const MultiSwapToken = await ethers.getContractFactory("MultiHopSwap");
		multiSwapToken = await MultiSwapToken.deploy(swapRouter);

		await multiSwapToken.deployed();

		weth = await ethers.getContractAt("IWETH", WETH9);
		dai = await ethers.getContractAt("IERC20", DAI);
		usdc = await ethers.getContractAt("IERC20", USDC);
	});

	// Swap exact input amount
	// it("swapExactInputMulti", async () => {
	// 	// const amountIn = ethers.utils.parseEther("1");
	// 	const amountIn = 10n ** 18n;

	// 	// Deposit WETH
	// 	await weth.deposit({ value: amountIn });
	// 	await weth.approve(multiSwapToken.address, amountIn);

	// 	// Swap
	// 	await multiSwapToken.swapExactInputMultihop(amountIn);
	// 	console.log("DAI balance", await dai.balanceOf(accounts[0].address));
	// });

	// Swap exact output amount
	it("swapExactOutputMulti", async () => {
		const wethAmountInMax = 100n * 10n ** 18n;
		const daiAmountOut = 100n * 10n ** 18n;

		// Deposit WETH
		await weth.deposit({ value: wethAmountInMax });
		await weth.approve(multiSwapToken.address, wethAmountInMax);
		console.log("WETH balance", await weth.balanceOf(accounts[0].address));

		// Swap
		await multiSwapToken.swapExactOutputMultihop(daiAmountOut, wethAmountInMax);
		console.log("DAI balance", await dai.balanceOf(accounts[0].address));
	});
});
