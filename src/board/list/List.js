/* eslint-disable no-undef */

import React, { Component } from 'react';
import { ApiHelper } from '../../helpers/Api.helper';

class ToDoList extends Component {
	constructor(props) {
		super(props);
		this.state ={
			items: []
		}
	}

	render () {
		return (
			<div>
				<h5>Your list for today</h5>

				{this.state.items.map(item => {
					return <div key={item._id}>
						{item.text} : {item.status}
					</div>;
				})}
			</div>
		)
	}

	componentDidMount () {
		fetch(ApiHelper.getItems(), {accept: 'application/json'})
			.then(response => response.json())
			.then(data => {
				this.setState(data);
			})
			.catch(function (ex) {
				console.log('parsing failed', ex)
			})
	}
}

export default ToDoList;
