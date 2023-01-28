import React, { useContext } from "react";
import "./welcome.scss";
import { TransactionContext } from "../../context/TransactionContext";

const Input = ({ placeholder, name, type, value, handleChange }) => (
	<input
		placeholder={placeholder}
		type={type}
		step="0.0001"
		value={value}
		onChange={(e) => handleChange(e, name)}
	/>
);

const Welcome = () => {
	const {
		connectWallet,
		currentAccount,
		formData,
		handleChange,
		sendTransaction,
	} = useContext(TransactionContext);

	const handleSubmit = (e) => {
		const { addressTo, amount, keyword, message } = formData;
		e.preventDefault();
		if (!addressTo || !amount || !keyword || !message) return;
		sendTransaction();
	};

	return (
		<div className="welcome">
			<h1>Welcome</h1>
			{!currentAccount && (
				<button onClick={connectWallet}>Connect wallet </button>
			)}
			<Input
				placeholder="Address To"
				name="addressTo"
				type="text"
				handleChange={handleChange}
			/>
			<Input
				placeholder="Amount (ETH)"
				name="amount"
				type="number"
				step="0.0001"
				handleChange={handleChange}
			/>
			<Input
				placeholder="Keyword (Gif)"
				name="keyword"
				type="text"
				handleChange={handleChange}
			/>
			<Input
				placeholder="Enter Message"
				name="message"
				type="text"
				handleChange={handleChange}
			/>
			<button
				type="submit"
				onClick={handleSubmit}
			>
				Send ETH
			</button>
		</div>
	);
};

export default Welcome;
