const { ethers } = require("hardhat");

describe("Transactions", () => {
	let TransactionsFactory, transactions;
	beforeEach(async () => {
		TransactionsFactory = await ethers.getContractFactory("Transactions");
		transactions = await Transactionsfactory.deploy();
	});

	it("");
});
