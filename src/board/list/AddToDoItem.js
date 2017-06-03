import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addToDo } from "../../store/actions/index";

class AddToDoItem extends Component {

	render () {
		let input;

		return (
			<div>
				<form onSubmit={e => {
					e.preventDefault()
					if (!input.value.trim()) {
						return
					}
					this.props.dispatch(addToDo(input.value));
					input.value = ''
				}}>
					<input ref={node => {
						input = node
					}} />
					<button type="submit">
						Add Todo
					</button>
				</form>
			</div>
		)
	}
}

AddToDoItem.propTypes = {
	// _id: PropTypes.string.isRequired,
	// text: PropTypes.string.isRequired,
	// status: PropTypes.string.isRequired
};

export default connect()(AddToDoItem)
