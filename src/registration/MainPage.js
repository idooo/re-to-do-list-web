import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchToDoLists } from "../store/actions/lists";

class MainPage extends React.Component {

	render () {
		let { lists } = this.props;
		return (
			<div>
				<h1>Welcome ido_q</h1>

				{lists.map((item, index) => {
					return <div key={index}>
						<Link to={`/board/${item._id}`}>{item.name}</Link>
					</div>
				})}
			</div>
		)
	}

	componentDidMount () {
		this.props.dispatch(fetchToDoLists())
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


