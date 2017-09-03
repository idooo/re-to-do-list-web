import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchToDoLists } from "../store/actions/lists";
import { AuthenticationService } from "../services/auth";

import './MainPage.css';
import APIService from "../services/API";


class MainPage extends React.Component {

	render () {
		let { lists } = this.props;
		let loginUrl = `${APIService.getAPIHost()}/api/1.0/login`;

		return (
			<div className="MainPage">

				<div className="MainPage__container">
					<h2 className="MainPage__header">Highly opinionated to-do list</h2>
				</div>

				<div className="MainPage__container" hidden={!AuthenticationService.isAuthorised()}>
					<h3>Your to-do lists</h3>

					{lists.map((item, index) => {
						return <div className="MainPage__list" key={index}>
							— <Link to={`/board/${item._id}`}>{item.name}</Link>
						</div>
					})}
				</div>

				<div className="MainPage__container" hidden={AuthenticationService.isAuthorised()}>
					Please <a href={loginUrl}>Login</a> or <a href={loginUrl}>create new account</a>
				</div>

			</div>
		)
	}

	componentDidMount () {
		if (AuthenticationService.isAuthorised()) {
			this.props.dispatch(fetchToDoLists())
		}
	}
}

MainPage.propTypes = {
	lists: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired).isRequired,
};

const mapStateToProps = (state) => {
	return {
		lists: state.lists || []
	}
};

export default connect(mapStateToProps)(MainPage)


