import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from "react-router";
import { HashRouter } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import Board from "./board/Board";
import Registration from "./registration/Registration";

ReactDOM.render(
	<HashRouter>
		<div className="App">
			<div className="App-header">
				<h2>Welcome to Re To-Do List</h2>
			</div>
			<div>
				<Route exact path="/" component={Registration}/>
				<Route path="/board" component={Board}/>
			</div>
		</div>
	</HashRouter>,
	document.getElementById('root')
);
registerServiceWorker();
