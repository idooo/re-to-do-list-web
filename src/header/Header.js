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
			</div>
		)
	}
}


export default withRouter(Header);
