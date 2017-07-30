import React from 'react';
import { withRouter } from 'react-router-dom';
import { AuthenticationService } from "../services/auth";

class Header extends React.Component {

	constructor (props) {
		super(props);
		AuthenticationService.authorise(props.history, '/board');
	}

	render () {
		return (
			<div className="App-header">
				<h2>Welcome to Re To-Do List</h2>

				<div>
					<a href="http://localhost:8080/login">Login</a>
				</div>

				<div>
					<a href="#" onClick={e => this.logout(e, this.props)}>Logout</a>
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
