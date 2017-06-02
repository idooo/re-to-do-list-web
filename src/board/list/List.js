import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApiHelper } from '../../helpers/Api.helper';

class ToDoList extends Component {

	render () {
		let { todos } = this.props;
		return (
			<div>
				<h5>Your list for today</h5>

				{todos.map(item => {
					return <div key={item._id}>
						{item.text} : {item.status}
					</div>;
				})}
			</div>
		)
	}

	async componentDidMount () {
		let { loadToDoList } = this.props;
		try {
			const response = await fetch(ApiHelper.getItems(), {accept: 'application/json'});
			const data = await response.json();
			loadToDoList(data.items);
		}
		catch (ex) {
			console.error('parsing failed', ex)
		}
	}
}

ToDoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired
	}).isRequired).isRequired,
	loadToDoList: PropTypes.func.isRequired
};

export default ToDoList;
