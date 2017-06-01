import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Registration extends Component {
	render () {
		return (
			<div>
				<h1>Welcome ido_q</h1>
				<Link to="/board">Go to your board</Link>
			</div>
		)
	}
}

export default Registration;
