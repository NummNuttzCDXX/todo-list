// ToDo Module

// ToDo Object Constructor -- Factory
export const Todo = (title, desc, due, priority, project) => {
	let completed = false;
	let date = due.date;
	let time = due.time;

	return {title, desc, date, time, priority, project, completed}
}
