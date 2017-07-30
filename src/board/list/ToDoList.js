import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ToDoItem from "./ToDoItem";
import AddToDoItem from "./AddToDoItem";

import './ToDoList.css';

class ToDoList extends React.Component {

	render () {
		const {items, dateCode, listId} = this.props;

		return (
			<div className="ToDoList">
				<h5>Your list for {dateCode}</h5>

				{items
					.filter(item => item.dateCode === dateCode)
					.map((item, index) => {
						return <ToDoItem key={index} item={item} listId={listId}/>;
					})}

				<AddToDoItem dateCode={dateCode} listId={listId}/>
			</div>
		)
	}
}

ToDoList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired
	}).isRequired).isRequired,
	listId: PropTypes.string.isRequired,
	dateCode: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		items: state.items || []
	}
};

export default connect(mapStateToProps)(ToDoList)
