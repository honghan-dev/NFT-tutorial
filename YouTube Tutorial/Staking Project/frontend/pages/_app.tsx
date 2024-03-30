import { AppProps } from "next/app";

import "@/styles/globals.css";
import { configureChains, sepolia, WagmiConfig, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export default function App({ Component, pageProps }: AppProps) {
	const { chains, provider, webSocketProvider } = configureChains(
		[sepolia],
		[publicProvider()]
	);

	const client = createClient({
		autoConnect: true,
		provider,
		webSocketProvider,
		connectors: [
			new MetaMaskConnector({
				chains,
			}),
		],
	});

	return (
		<WagmiConfig client={client}>
			<Component {...pageProps} />
		</WagmiConfig>
	);
}
