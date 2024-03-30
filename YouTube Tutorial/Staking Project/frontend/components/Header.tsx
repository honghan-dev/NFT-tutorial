import { useEffect, useState } from "react";
import { Bean } from "@web3uikit/icons";
import styles from "@/styles/Home.module.css";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const { isConnected } = useAccount();
	const { connect, connectors } = useConnect();
	const { disconnect } = useDisconnect();

	useEffect(() => {
		if (isConnected) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [isConnected]);

	return (
		<section className={styles.header}>
			<section className={styles.header_logoSection}>
				<h1 className={styles.title}>StakeX</h1>
				<Bean
					fontSize="20px"
					className={styles.beans}
				/>
			</section>

			{/* Connect button */}
			<section className={styles.header_btn}>
				{isLoggedIn ? (
					<button
						className={styles.connectBtn}
						onClick={() => disconnect()}
					>
						DISCONNECT WALLET
					</button>
				) : (
					<>
						{connectors.map((connector) => (
							<button
								key={connector.id}
								// disabled={!connector.ready}
								onClick={() => connect({ connector })}
								className={styles.connectBtn}
							>
								CONNECT WALLET
							</button>
						))}
					</>
				)}
			</section>
		</section>
	);
};

export default Header;
