import { getSimpleAccount } from "../../utils";
import { ethers } from "ethers";
// @ts-ignore
import config from "../../config.json";

export async function address() {
	const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
	const accountAPI = getSimpleAccount(
		provider,
		config.signingKey,
		config.entryPoint,
		config.simpleAccountFactory
	);
	const address = await accountAPI.getCounterFactualAddress();

	console.log(`SimpleAccount address: ${address}`);
}
