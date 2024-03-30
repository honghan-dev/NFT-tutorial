import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", async () => {
	// Declaring variables
	let simpleStorageFactory: SimpleStorage__factory,
		simpleStorage: SimpleStorage;

	beforeEach(async () => {
		// Deploying the contract
		simpleStorageFactory = (await ethers.getContractFactory(
			"SimpleStorage"
		)) as SimpleStorage__factory;
		simpleStorage = await simpleStorageFactory.deploy();
	});

	// Creating a test suite
	describe("SimpleStorage", async () => {
		// Creating a test case
		it("Should start with 0", async () => {
			// Getting the current value of the contract
			const currentValue = await simpleStorage.retrieve();

			// Checking if the value is equal to 0
			expect(currentValue).to.equal(0);
		});
	});

	/**
	 * This test adds a person to the list of people in the SimpleStorage contract.
	 * It then checks that the name and favourite number are correct.
	 * It also checks that the nameToFavouriteNumber mapping is correct.
	 */
	it("should add a person to the list", async function () {
		// We expect Alice to be added to the contract
		const expectedName = "Alice";
		const expectedNumber = 42;

		// Add a new person to the contract
		await simpleStorage.addPerson(expectedName, expectedNumber);

		// Get the first (and only) person in the contract
		const people = await simpleStorage.peoples(0);

		// Check that the name and favourite number are correct
		expect(people.name).to.equal(expectedName);
		expect(people.favouriteNumber).to.equal(expectedNumber);

		// Check that the name to number mapping is correct
		const number = await simpleStorage.nameToFavouriteNumber(expectedName);
		expect(number).to.equal(expectedNumber);
	});
});
