import React, { Component } from 'react';
import { connect } from "react-redux";
import ToDoList from "./list/ToDoList";
import { fetchToDoList } from "../store/actions/index";

class Board extends Component {

	render () {
		return (
			<div>
				<h3>This is the board</h3>
				<ToDoList dateDelta={-1}/>
				<ToDoList dateDelta={0}/>
				<ToDoList dateDelta={1}/>
			</div>
		)
	}

	componentDidMount () {
		this.props.dispatch(fetchToDoList())
	}
}

export default connect()(Board)
