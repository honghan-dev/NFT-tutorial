import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Welcome from "./components/Welcome/Welcome";
import Transactions from "./components/Transaction/Transactions";
import Footer from "./components/Footer/Footer";

const App = () => {
	return (
		<div className="App">
			<Navbar />
			<h1>Hello World</h1>
			<Welcome />
			<Transactions />
			<Footer />
		</div>
	);
};

export default App;
