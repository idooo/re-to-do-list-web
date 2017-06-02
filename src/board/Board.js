import React, { Component } from 'react';
import ToDoListContainer from "./list/ToDoList.container";

class Board extends Component {
	render () {
		return (
			<div>
				<h3>This is the board</h3>
				<ToDoListContainer/>
			</div>
		)
	}
}

export default Board;
