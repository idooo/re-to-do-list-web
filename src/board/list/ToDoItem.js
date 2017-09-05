import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { RIEInput } from 'riek';
import { copyToDo, modifyToDo } from "../../store/actions/items";
import { DateCode } from "../../services/datecode";

import './ToDoItem.css';


class ToDoItem extends React.Component {

	render () {
		let {item} = this.props;
		return (
			<div className={`ToDoItem ToDoItem--${item.status}`}>

				<span className="ToDoItem__priority">
					{ item.priority === 1 ? <i className="fa fa-angle-up"> </i>: null }
					{ item.priority === 2 ? <i className="fa fa-angle-double-up"> </i>: null }
				</span>

				<span className="ToDoItem__status" onClick={() => this.clickOnStatus()}>
					<i className={`fa ${item.status === 'DONE' ? 'fa-check-circle' : 'fa-circle-thin'}`}> </i>
				</span>

				<RIEInput
					value={item.text}
					change={object => this.textChanged(object.text)}
					propName="text"
					className="ToDoItem__text"
					classEditing="ToDoItem__input"/>

				<div className="ToDoItem__controls">
					<i className="fa fa-angle-up" alt="Set higher priority" onClick={() => this.increasePriority()}> </i>
					<i className="fa fa-copy ToDoItem__copy" alt="Copy to next day" onClick={() => this.copy(1)}> </i>
				</div>

			</div>
		)
	}

	clickOnStatus () {
		const { listId, item } = this.props;
		this.props.dispatch(modifyToDo(listId, item._id, {status: item.status !== 'DONE' ? 'DONE' : 'OPEN'}));
	}

	textChanged (text) {
		const { listId, item } = this.props;
		this.props.dispatch(modifyToDo(listId, item._id, {text}));
	}

	setPriority (priority = 0) {
		const { listId, item } = this.props;
		this.props.dispatch(modifyToDo(listId, item._id, {priority}));
	}

	increasePriority () {
		const { item } = this.props;
		const priority = item.priority >= 2 ? 0 : item.priority + 1;
		this.setPriority(priority)
	}

	copy (days) {
		const { listId, item } = this.props;
		this.props.dispatch(copyToDo(listId, {...item, dateCode: DateCode.getNextDateCode(item.dateCode, days)}));
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
