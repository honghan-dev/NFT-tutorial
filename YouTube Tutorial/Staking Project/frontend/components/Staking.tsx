import { useEffect, useState } from "react";

import styles from "./staking.module.scss";
import {
	useAccount,
	useContract,
	useProvider,
	useSigner,
	useBalance,
} from "wagmi";
import { ethers } from "ethers";

import { CONTRACT_ADDRESS, ABI } from "@/contracts";
import useWalletBalance from "@/hooks";

const Staking = () => {
	const { isConnected, address } = useAccount();
	const provider = useProvider({ chainId: 11155111 });
	const { data: signer } = useSigner();

	const [walletBalance, setWalletBalance] = useState<string>("");
	const [stakingTab, setStakingTab] = useState<boolean>(true);
	const [unstakingTab, setUnstakingTab] = useState<boolean>(false);
	const [unstakeValue, setUnstakeValue] = useState<number>(0);

	const [assetId, setAssetId] = useState<[]>([]);

	const [assets, setAssets] = useState<[]>([]);
	const [amount, setAmount] = useState<number>(0);

	const toWei = (ether: string) => {
		return ethers.utils.parseEther(ether);
	};
	const toEther = (wei: string) => {
		return ethers.utils.formatEther(wei);

		ethers.providers;
	};

	const { data, refetch } = useBalance({
		address: "0x8DC0808B504c81e709595eC48aFcbF80D96F84ed",
		enabled: Boolean("0x8DC0808B504c81e709595eC48aFcbF80D96F84ed"),
	});

	const staking = useContract({
		address: CONTRACT_ADDRESS,
		abi: ABI,
		signerOrProvider: provider,
	});

	useEffect(() => {}, []);

	return <div></div>;
};

export default Staking;
