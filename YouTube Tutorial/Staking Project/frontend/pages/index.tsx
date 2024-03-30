import Head from "next/head";

import { Header, Main, Staking } from "@/components";
import styles from "@/styles/Home.module.css";

export default function Home() {
	return (
		<section className={styles.main}>
			<Head>
				<title>StakeX</title>
			</Head>
			<Header />
			<Main />
			<Staking />
		</section>
	);
}
