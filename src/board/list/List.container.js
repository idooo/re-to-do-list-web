import { connect } from 'react-redux'
import { loadToDoList } from "../../store/actions/index";
import ToDoList from './List'

const mapStateToProps = (state) => {
	return {
		todos: state.todos || []
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadToDoList: (toDoList) => {
			dispatch(loadToDoList(toDoList))
		}
	}
};

const ToDoListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ToDoList);

export default ToDoListContainer
