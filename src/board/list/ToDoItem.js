import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { RIEInput } from 'riek';
import { copyToDo, modifyToDo } from "../../store/actions/index";

class ToDoItem extends Component {

	render () {
		let {item} = this.props;
		return (
			<div className={`ToDoItem ToDoItem--${item.status}`}>

				<span onClick={() => this.clickOnStatus(item._id, item.status)}>

					<i className={`fa ${item.status === 'DONE' ? 'fa-check-circle' : 'fa-circle-thin'}`}> </i>

				</span>

				<RIEInput
					value={item.text}
					change={object => this.textChanged(item._id, object.text)}
					propName="text"
					className={"editable"}
					validate={this.isStringAcceptable}/>

				<i className="fa fa-arrow-right ToDoItem__copy" onClick={() => this.copy(item)}> </i>

			</div>
		)
	}

	clickOnStatus (_id, status) {
		this.props.dispatch(modifyToDo(_id, {status: status !== 'DONE' ? 'DONE' : 'OPEN'}));
	}

	textChanged (_id, text) {
		this.props.dispatch(modifyToDo(_id, {text}));
	}

	copy (item) {
		this.props.dispatch(copyToDo({...item, dateDelta: item.dateDelta + 1}));
	}

}

ToDoItem.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		uuid: PropTypes.string
	}).isRequired,
};


export default connect()(ToDoItem)
