import React from "react";

const ListItem = props => {
	return props.todos.map((el, i) => {
		return (
			<li className="list-group-item" key={el.id}>
				<button
					onClick={() => props.updateButtonClicked(i)}
					className="btn-sm btn btn-info mr-4"
				>
					U
				</button>
				{el.name}
				<button
					onClick={() => {
						props.deleteTodo(i);
					}}
					className="btn-sm btn btn-danger ml-4"
				>
					X
				</button>
			</li>
		);
	});
};

export default ListItem;
