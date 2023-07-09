// ToDo Module

// ToDo Object Constructor -- Factory
export const Todo = (title, desc, due, priority, project) => {
	let completed = false;

	return {title, desc, due, priority, setPriority, project, completed}
}
