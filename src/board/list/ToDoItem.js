import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { completeToDo, copyToDo } from "../../store/actions/index";


class ToDoItem extends Component {

	render () {
		let {item} = this.props;
		return (
			<div className={`ToDoItem ToDoItem__${item.status}`}>

				<span onClick={event => this.clickOnStatus(event, item)}>

					<i className={`fa ${item.status === 'DONE' ? 'fa-check-circle': 'fa-circle-thin'}`}> </i>

				</span>

				{item.text}

				:

				<a onClick={e => {
					e.preventDefault();
					this.props.dispatch(copyToDo({...item, dateDelta: item.dateDelta + 1}));
				}}>
					Copy
				</a>
			</div>
		)
	}

	clickOnStatus (event, item) {
		event.preventDefault();
		if (item.status !== 'DONE') this.props.dispatch(completeToDo(item._id));
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
