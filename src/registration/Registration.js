import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Registration extends React.Component {

	render () {
		return (
			<div>
				<h1>Welcome ido_q</h1>
				<Link to="/board">Go to your board</Link>

			</div>
		)
	}
}

export default connect()(Registration)
