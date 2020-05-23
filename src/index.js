import React from "react";
import ReactDOM from "react-dom";

import { Game } from './components/Game';

// Styles
import './styles/main.css';

const App = () => {
	return (
 		<Game />
	)
};

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);