import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ToDoItem extends Component {

	render () {
		let {_id, text, status} = this.props;
		return (
			<div>
				{_id} : {text} : {status}
			</div>
		)
	}
}

ToDoItem.propTypes = {
	_id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired
};

export default ToDoItem;
