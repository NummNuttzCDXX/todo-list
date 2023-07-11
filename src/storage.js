// Storage Module

export const store = (() => {
	// Todo module to get/set todo storage
	const todos = (() => {
		// Add new todo to be saved -- Give toDos array as param
		const update = (array) => {
			window.localStorage.setItem('todos', JSON.stringify(array));
		}

		// Retrieve toDos array 
		const get = () => {
			if (window.localStorage.getItem('todos') === null) { return false; }
			return JSON.parse(window.localStorage.todos)
		}

		return { update, get }
	})()

	return { todos }
})()