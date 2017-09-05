import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { fetchToDoItems } from "../store/actions/items";
import ToDoList from "./list/ToDoList";
import BoardControl from "./BoardControl";

import './Board.css';


class Board extends React.Component {

	render () {
		const listId = this.props.match.params.listId;
		const { dateCodes} = this.props;

		return (
			<div className="Board">

				<BoardControl />

				<div className="Board__container">
					{dateCodes.map((item, i) => {
						return <ToDoList
							className={`ToDoList--length-${dateCodes.length}`}
							key={i}
							dateCode={item}
							listId={listId}/>
					})}
				</div>
			</div>
		)
	}

	componentDidMount () {
		const listId = this.props.match.params.listId;
		this.props.dispatch(fetchToDoItems(listId))
	}
}

ToDoList.propTypes = {
	dateCodes: PropTypes.array,
	view: PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		dateCodes: state.board.dateCodes || [],
		view: state.board.view || ''
	}
};

export default connect(mapStateToProps)(Board)
