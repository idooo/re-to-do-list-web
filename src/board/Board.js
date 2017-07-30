import React from 'react';
import { connect } from "react-redux";
import ToDoList from "./list/ToDoList";
import { fetchToDoItems } from "../store/actions/items";

import './Board.css';
import { DateCode } from "../services/datecode";


class Board extends React.Component {

	render () {
		const listId = this.props.match.params.listId;
		const dateCodes = DateCode.getRangeCodes();

		return (
			<div className="Board">
				<h3>This is the board</h3>
				<div className="Board-container">
					<ToDoList dateCode={dateCodes[0]} listId={listId}/>
					<ToDoList dateCode={dateCodes[1]} listId={listId}/>
					<ToDoList dateCode={dateCodes[2]} listId={listId}/>
				</div>
			</div>
		)
	}

	componentDidMount () {
		const listId = this.props.match.params.listId;
		this.props.dispatch(fetchToDoItems(listId))
	}
}

export default connect()(Board)
