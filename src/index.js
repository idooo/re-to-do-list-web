import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Route } from "react-router";
import { HashRouter } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import Board from "./board/Board";
import Registration from "./registration/Registration";
import configureStore from "./store/configure";
import storage from "./store/storage";

const store = configureStore(storage.get('RETODO') || {});

ReactDOM.render(
	<Provider store={store}>
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
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
