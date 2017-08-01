import React from 'react';
import { withRouter } from 'react-router-dom';
import { AuthenticationService } from "../services/auth";
import APIService from "../services/API";

import './Header.css';


class Header extends React.Component {

	constructor (props) {
		super(props);
		AuthenticationService.authorise(props.history, '/');
	}

	render () {
		return (
			<div className="Header">
				<h2 className="Header__text">Re To-Do</h2>

				<div className="Header__auth-container">
					<a href={`${APIService.getAPIHost()}/api/1.0/login`}>Login</a> |
					<a onClick={e => this.logout(e, this.props)}>Logout</a>
				</div>
			</div>
		)
	}

	logout (e, props) {
		e.preventDefault();
		AuthenticationService.logout(props.history, '/');
	}
}


export default withRouter(Header);
