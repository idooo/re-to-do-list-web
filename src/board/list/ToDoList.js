import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ToDoItem from "./ToDoItem";
import AddToDoItem from "./AddToDoItem";

import './ToDoList.css';

class ToDoList extends React.Component {

	render () {
		let {todos, dateCode} = this.props;

		return (
			<div className="ToDoList">
				<h5>Your list for {dateCode}</h5>

				{todos
					.filter(item => item.dateCode === dateCode)
					.map((item, index) => {
						return <ToDoItem key={index} item={item}/>;
					})}

				<AddToDoItem dateCode={dateCode}/>
			</div>
		)
	}
}

ToDoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired
	}).isRequired).isRequired,
	dateCode: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		todos: state.todos || []
	}
};

export default connect(mapStateToProps)(ToDoList)
