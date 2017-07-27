import React, { Component } from 'react';
import { connect } from "react-redux";
import ToDoList from "./list/ToDoList";
import { fetchToDoList } from "../store/actions/index";

import './Board.css';

class Board extends Component {

	render () {
		return (
			<div className="Board">
				<h3>This is the board</h3>
				<div className="Board-container">
					<ToDoList dateDelta={-1}/>
					<ToDoList dateDelta={0}/>
					<ToDoList dateDelta={1}/>
				</div>
			</div>
		)
	}

	componentDidMount () {
		this.props.dispatch(fetchToDoList())
	}
}

export default connect()(Board)
