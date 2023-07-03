// Dom Manipulation Module
import { Todo } from "./todo";

export const dom = (() => {
	const content = document.querySelector('#content');

	// Get values of inputs -- Globally
	let titleInp = document.querySelector('form #title');
	let descInp = document.querySelector('form #desc');
	let dueInp = document.querySelector('form #due');
	let priorityInp = document.querySelector('form #priority');
	// This will take the value of inputs and create new object
	const createTodo = () => {
		let newTodo = Todo(titleInp.value, descInp.value, dueInp.value, priorityInp.value);

		return newTodo;
	}

	const createCard = (item) => {
		const card = document.createElement('div');
		card.classList.add('card');

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = item.title;

		const desc = document.createElement('div');
		desc.classList.add('desc');
		desc.textContent = item.desc;

		const due = document.createElement('div');
		due.classList.add('due');
		due.textContent = item.due;

		const priority = document.createElement('div');
		priority.classList.add('priority');
		priority.textContent = item.priority;

		card.appendChild(title);
		card.appendChild(desc);
		card.appendChild(due);
		card.appendChild(priority);

		return card;
	}

	const clearInputs = () => {
		titleInp.value = '';
		descInp.value = '';
		dueInp.value = '';
		priorityInp.value = 'default';
	}

	// This function will run when the submit button is clicked
	const subTodo = () => {
		// Create new Todo Object
		let newTodo = createTodo();

		// Create card to hold Obj
		let card = createCard(newTodo);

		// Clear form inputs
		clearInputs()
		
		return { newTodo, card }
	}

	const checkRequired = () => {
		const reqFields = document.querySelectorAll('form :required');
		// Declare var to tell if check passed or not
		let pass = true;

		reqFields.forEach(input => {
			if (input.nodeName === 'SELECT') {
				if (input.value === 'default') {
					input.classList.add('fail');
					pass = false
				};
			} else if (input.value === '') {
				input.classList.add('fail');
				pass = false
			};
		})

		return pass;
	}

	const toggleDropdown = (dropdown) => {
		if (dropdown.lastElementChild.style.display === 'block') {
			dropdown.lastElementChild.style.display = 'none';
		} else {
			dropdown.lastElementChild.style.display = 'block';
		}
	}

	// Project Module -- For organisation
	const projects = (() => {
		// Create and add project dropdown to sidebar
		const addToSidebar = (name) => {
			const sidebar = document.querySelector('#sidebar');

			// Create the dropdown
			const dropdown = document.createElement('div');
			dropdown.classList.add('dropdown');
			dropdown.id = name;

			const project = document.createElement('p');
			project.textContent = name;
			dropdown.appendChild(project);

			// Create and add the dropdown-content
			const dropContent = document.createElement('div');
			dropContent.classList.add('dropdown-content');
			dropdown.appendChild(dropContent);

			const ul = document.createElement('ul');
			dropContent.appendChild(ul);

			// Add the listener for dropdown menu
			dropdown.addEventListener('click', () => toggleDropdown(dropdown));

			// Add dropdown to sidebar
			sidebar.appendChild(dropdown);

			return dropdown;
		}

		// Add ToDo to a project on the DOM
		const addTodo = (projectDropdown, todo) => {
			const ul = projectDropdown.lastElementChild.lastElementChild;
			const li = document.createElement('li');

			li.textContent = todo.title
			ul.appendChild(li);
		}

		return { addToSidebar, addTodo }
	})()

	return { subTodo, checkRequired, content, toggleDropdown, projects }
})()