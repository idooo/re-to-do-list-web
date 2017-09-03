import React from 'react';
import { withRouter } from 'react-router-dom';
import { AuthenticationService } from "../services/auth";

import './Header.css';


class Header extends React.Component {

	constructor (props) {
		super(props);
		AuthenticationService.authorise(props.history, '/');
	}

	render () {
		return (
			<div className="Header">
				<h2 className="Header__text">
					Re:ToDo

					<a onClick={e => this.logout(e, this.props)}>
						<i className="fa fa-sign-out Header__logout" />
					</a>
				</h2>
			</div>
		)
	}

	logout (e, props) {
		e.preventDefault();
		AuthenticationService.logout(props.history, '/');
	}
}


export default withRouter(Header);
