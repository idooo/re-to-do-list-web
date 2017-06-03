import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { completeToDo, copyToDo } from "../../store/actions/index";


class ToDoItem extends Component {

	render () {
		let {item} = this.props;
		return (
			<div>

				{item._id} : {item.text} : {item.status} :

				<a onClick={e => {
					e.preventDefault();
					this.props.dispatch(completeToDo(item._id));
				}}>
					Complete
				</a>

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
