import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import SingleEpisode from "./components/single-episode/SingleEpisode";
import "./App.scss";

const App = () => {
	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/episode/:season/:episode">
						<SingleEpisode />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
