import React, { Component } from 'react';
import ToDoList from "./list/ToDoList";

class Board extends Component {

	render () {
		return (
			<div>
				<h3>This is the board</h3>
				<ToDoList/>
			</div>
		)
	}
}

export default Board;
