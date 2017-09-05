import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { RIEInput } from 'riek';
import { modifyToDo, TODO_STATUS_TYPES } from "../../store/actions/items";
import ToDoItemControl from "./ToDoItemControl";

import './ToDoItem.css';


class ToDoItem extends React.Component {

	render () {
		let { listId, item } = this.props;
		return (
			<div className={`ToDoItem ToDoItem--${item.status}`}>

				<span className="ToDoItem__priority">
					{ item.priority === 1 ? <i className="fa fa-angle-up" /> : null }
					{ item.priority === 2 ? <i className="fa fa-angle-double-up" /> : null }
				</span>

				<span className="ToDoItem__status" onClick={() => this.clickOnStatus()}>
					<i className={`fa ${item.status === TODO_STATUS_TYPES.DONE ? 'fa-check-circle' : 'fa-circle-thin'}`}> </i>
				</span>

				<RIEInput
					value={item.text}
					change={object => this.textChanged(object.text)}
					propName="text"
					className="ToDoItem__text"
					classEditing="ToDoItem__input"/>

				<ToDoItemControl item={item} listId={listId} />

			</div>
		)
	}

	clickOnStatus () {
		const { listId, item } = this.props;
		this.props.dispatch(modifyToDo(
			listId,
			item._id,
			{status: item.status === TODO_STATUS_TYPES.OPEN ? TODO_STATUS_TYPES.DONE : TODO_STATUS_TYPES.OPEN}
		));
	}

	textChanged (text) {
		const { listId, item } = this.props;
		this.props.dispatch(modifyToDo(listId, item._id, {text}));
	}

}

ToDoItem.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		uuid: PropTypes.string
	}).isRequired,
	listId: PropTypes.string.isRequired
};


export default connect()(ToDoItem)
