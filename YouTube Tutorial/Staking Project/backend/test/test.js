const { expect } = require("chai");
const hre = require("hardhat");

describe("Staking", () => {
	// Global variables
	let Staking;
	let staking;
	let owner;
	let user1;
	let user2;

	// Deploy contract before each test
	beforeEach(async () => {
		// Get the staking contract factory and signers here.
		Staking = await hre.ethers.getContractFactory("Staking");
		// Deploy the staking contract
		staking = await Staking.deploy();
		[owner, user1, user2] = await hre.ethers.getSigners();
	});

	it("should stake ether and create a position", async function () {
		const weiAmount = hre.ethers.parseEther("1");
		const numDays = 30;
		// User1 stakes ether for 30 days
		const stakeTx = await staking
			.connect(user1)
			.stakeEther(numDays, { value: weiAmount });
		const positionId = 0; // Assuming it's the first position
		const position = await staking.getPositionById(positionId);
		// Check that the position is created correctly
		expect(position.walletAddress).to.equal(user1.address);
		expect(position.weiStaked).to.equal(weiAmount);
		expect(position.open).to.equal(true);
	});

	it("should calculate the interest rate for a lock period", async function () {
		const numDays = 30;

		// Get the interest rate for 30 days
		const interestRate = await staking.getInterestRate(numDays);

		// Check that the interest rate is correct
		expect(interestRate).to.equal(800); // Assuming 800 is the interest rate for 30 days
	});

	it("should get the lock periods available", async () => {
		//  Get the lock periods available
		const lockPeriods = await staking.getLockPeriods();

		// Check that the lock periods are correct
		expect(lockPeriods).to.deep.equal([0, 30, 60, 90]); // Assuming these are the available lock periods
	});

	it("should close a position and transfer the staked ether and interest", async () => {
		const weiStaked = 1n;
		const interest = hre.ethers.parseEther("0.1");

		// User1 stakes ether for 30 days
		const numDays = 30;
		const stakeTx = await staking
			.connect(user1)
			.stakeEther(numDays, { value: weiStaked });
		await stakeTx.wait();

		const positionId = 0; // Assuming it's the first position

		// User1 closes the position
		const closePositionTx = await staking
			.connect(user1)
			.closePosition(positionId);
		const closePositionReceipt = await closePositionTx.wait();

		// Retrieve the gas price
		const provider = ethers.provider;
		const gasPrice = await provider.getGasPrice();

		// Calculate the gas cost
		const gasUsed = closePositionReceipt.gasUsed;
		const gasCost = ethers.formatUnits(gasUsed.mul(gasPrice), "ether");

		// Calculate the total amount
		const totalAmount = weiStaked.add(interest).sub(gasCost);

		// Check that the staked ether and interest are transferred to user1
		const user1Balance = await ethers.provider.getBalance(user1.address);
		expect(user1Balance).to.equal(totalAmount);
	});
});
