import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Route } from "react-router";
import { HashRouter } from "react-router-dom";
import * as Cookies from 'js-cookie';

import Header from "./header/Header";
import Board from "./board/Board";
import MainPage from "./registration/MainPage";
import configureStore from "./store/configure";
import storage from "./store/storage";
import APIService from "./services/API";
import { JWT_COOKIE_NAME } from "./services/auth";

import './index.css';
import './font-awesome/css/font-awesome.css'

const store = configureStore(storage.get('RETODO') || {});

APIService.addAuthorisationHeader(Cookies.get(JWT_COOKIE_NAME));

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<div className="App">
				<Header/>
				<div>
					<Route exact path="/" component={MainPage}/>
					<Route path="/board/:listId" component={Board}/>
				</div>
			</div>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);
