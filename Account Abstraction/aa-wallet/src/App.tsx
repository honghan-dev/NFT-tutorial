import "./App.css";
import { address } from "./scripts/simpleAccount/address";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<button onClick={() => address()}>Create Wallet</button>
			</header>
		</div>
	);
}

export default App;
