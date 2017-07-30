import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { RIEInput } from 'riek';
import { copyToDo, modifyToDo } from "../../store/actions/items";
import { DateCode } from "../../services/datecode";

class ToDoItem extends React.Component {

	render () {
		let {item} = this.props;
		return (
			<div className={`ToDoItem ToDoItem--${item.status}`}>

				<span onClick={() => this.clickOnStatus()}>
					<i className={`fa ${item.status === 'DONE' ? 'fa-check-circle' : 'fa-circle-thin'}`}> </i>
				</span>

				<RIEInput
					value={item.text}
					change={object => this.textChanged(object.text)}
					propName="text"
					className={"editable"}/>

				<i className="fa fa-arrow-right ToDoItem__copy" onClick={() => this.copy(1)}> </i>

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
