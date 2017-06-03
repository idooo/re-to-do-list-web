import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ToDoItem from "./ToDoItem";
import AddToDoItem from "./AddToDoItem";
import { fetchToDoList } from "../../store/actions/index";

import './ToDoList.css';

class ToDoList extends Component {

	render () {
		let {todos, dateDelta} = this.props;

		return (
			<div className="ToDoList">
				<h5>Your list for {dateDelta}</h5>

				{todos
					.filter(item => item.dateDelta === dateDelta)
					.map((item, index) => {
					return <ToDoItem key={index} item={item} />;
				})}

				<AddToDoItem dateDelta={dateDelta}/>
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
	dateDelta: PropTypes.number.isRequired,
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		todos: state.todos || []
	}
};

export default connect(mapStateToProps)(ToDoList)
