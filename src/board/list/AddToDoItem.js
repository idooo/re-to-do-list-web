import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addToDo } from "../../store/actions/index";

class AddToDoItem extends Component {

	render () {
		const {dateDelta} = this.props;
		let input;

		return (
			<div>
				<form onSubmit={e => {
					e.preventDefault();
					if (!input.value.trim()) return;
					this.props.dispatch(addToDo({
						dateDelta,
						text: input.value
					}));
					input.value = ''
				}}>
					<input ref={node => {
						input = node
					}} />

					<button type="submit">Add Todo</button>
				</form>
			</div>
		)
	}
}

AddToDoItem.propTypes = {
	dateDelta: PropTypes.number
};

AddToDoItem.defaultProps = {
	dateDelta: 0
};

export default connect()(AddToDoItem)
