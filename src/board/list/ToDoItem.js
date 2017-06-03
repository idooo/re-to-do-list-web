import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { completeToDo } from "../../store/actions/index";


class ToDoItem extends Component {

	render () {
		let {_id, text, status} = this.props;
		return (
			<div>

				{_id} : {text} : {status}

				<a onClick={e => {
					e.preventDefault();
					this.props.dispatch(completeToDo({
						text,
						_id,
						status: 'CLOSED'
					}));
				}}>
					Complete
				</a>
			</div>
		)
	}

}

ToDoItem.propTypes = {
	_id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired
};


export default connect()(ToDoItem)
