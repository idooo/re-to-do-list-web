import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { copyToDo, modifyToDo } from "../../store/actions/index";
import { RIEInput } from 'riek';

class ToDoItem extends Component {

	render () {
		let {item} = this.props;
		return (
			<div className={`ToDoItem ToDoItem__${item.status}`}>

				<span onClick={() => this.clickOnStatus(item._id, item.status)}>

					<i className={`fa ${item.status === 'DONE' ? 'fa-check-circle' : 'fa-circle-thin'}`}> </i>

				</span>

				<RIEInput
					value={item.text}
					change={object => this.textChanged(item._id, object.text)}
					propName="text"
					className={"editable"}
					validate={this.isStringAcceptable}/>

				:

				<i className="fa fa-cog"> </i>

				<a onClick={e => {
					e.preventDefault();
					this.props.dispatch(copyToDo({...item, dateDelta: item.dateDelta + 1}));
				}}>
					Copy
				</a>
			</div>
		)
	}

	clickOnStatus (_id, status) {
		this.props.dispatch(modifyToDo(_id, {status: status !== 'DONE' ? 'DONE' : 'OPEN'}));
	}

	textChanged (_id, text) {
		this.props.dispatch(modifyToDo(_id, {text}));
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
