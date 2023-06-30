// ToDo Module

// ToDo Object Constructor -- Factory
export const Todo = (title, desc, due, priority) => {
	let completed = false;

	const setPriority = (newPriority) => {
		priority = newPriority;
		return newPriority;
	}

	return {title, desc, due, priority, setPriority, completed}
}
