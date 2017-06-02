import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToDoItem from "./ToDoItem";
import { fetchToDoList } from "../../store/actions/index";

class ToDoList extends Component {

	render () {
		let { todos } = this.props;
		return (
			<div>
				<h5>Your list for today</h5>

				{todos.map(item => {
					return <ToDoItem key={item._id} {...item} />;
				})}
			</div>
		)
	}

	componentDidMount () {
		this.props.dispatch(fetchToDoList())
	}
}

ToDoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired
	}).isRequired).isRequired,
	dispatch: PropTypes.func.isRequired
};

export default ToDoList;
