import React from "react";
import ListItem from "./../components/ListItem";

const TodoList = props => {
	return (
		<div className="container">
			<div className="alert mt-3 pt-4 alert-success" hidden={!props.showAlert}>
				<p className="text-center">Todo is successfully {props.alertType}!</p>
			</div>
			<input
				id="input"
				type="text"
				name="todo"
				className="form-control my-4"
				placeholder="Add a new todo"
				onChange={props.changeOnInput}
				value={props.newTodo}/>
			<button
				disabled={props.newTodo.length < 5}
				onClick={props.addOrUpdateTodo}
				className="btn-info form-control mb-3">
				{props.isUpdateButtonClicked ? "Update ToDo" : "Add ToDo"}
			</button>
			<ul className="list-group" hidden={props.isUpdateButtonClicked}>
				<ListItem
					deleteTodo={props.deleteTodo}
					updateButtonClicked={props.updateButtonClicked}
					todos={props.todos}/>
			</ul>
		</div>
	);
};

TodoList.displayName = "TodoList";

export default TodoList;
