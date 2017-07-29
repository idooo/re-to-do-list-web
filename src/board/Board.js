import React from 'react';
import { connect } from "react-redux";
import ToDoList from "./list/ToDoList";
import { fetchToDoList } from "../store/actions/index";

import './Board.css';
import { DateCode } from "../services/datecode";


class Board extends React.Component {

	render () {
		const dateCodes = DateCode.getRangeCodes();

		return (
			<div className="Board">
				<h3>This is the board</h3>
				<div className="Board-container">
					<ToDoList dateCode={dateCodes[0]}/>
					<ToDoList dateCode={dateCodes[1]}/>
					<ToDoList dateCode={dateCodes[2]}/>
				</div>
			</div>
		)
	}

	componentDidMount () {
		this.props.dispatch(fetchToDoList())
	}
}

export default connect()(Board)
