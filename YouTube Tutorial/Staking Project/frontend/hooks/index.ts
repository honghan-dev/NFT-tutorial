import { useState, useEffect } from "react";
import { ethers, BigNumber, providers } from "ethers";

const { NEXT_PUBLIC_ALCHEMY_API_KEY } = process.env;
const alchemyProvider = new providers.AlchemyProvider(
	"goerli",
	NEXT_PUBLIC_ALCHEMY_API_KEY
);

const useWalletBalance = (address: string) => {
	const [balance, setBalance] = useState<string>("");

	useEffect(() => {
		const getBalance = async () => {
			try {
				const provider = ethers.getDefaultProvider();
				const walletBalance: BigNumber = await alchemyProvider.getBalance(
					address
				);
				const formattedBalance = ethers.utils.formatEther(walletBalance);
				setBalance(formattedBalance);
			} catch (error) {
				console.error("Error retrieving wallet balance:", error);
				setBalance("");
			}
		};

		if (address) {
			getBalance();
		}
	}, [address]);

	return balance;
};

export default useWalletBalance;
