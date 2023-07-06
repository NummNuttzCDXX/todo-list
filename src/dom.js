// Dom Manipulation Module
import { Todo } from "./todo";
import { format, parseISO, formatDistanceToNow, isPast, formatISO } from "date-fns";

export const dom = (() => {
	const content = document.querySelector('#content');

	const createCard = (item) => {
		const card = document.createElement('div');
		card.classList.add('card');

		// Title
		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = item.title;

		// Description
		const descContainer = document.createElement('div');
		descContainer.classList.add('desc');

		const descHead = document.createElement('h5');
		descHead.classList.add('head');
		descHead.textContent = 'Description: ';

		const descContent = document.createElement('span');
		descContent.textContent = item.desc;

		descContainer.appendChild(descHead);
		descContainer.appendChild(descContent);		

		// Due Date
		const due = document.createElement('div');
		due.classList.add('due');
		due.textContent = item.due;

		// Priority
		const priority = document.createElement('div');
		priority.classList.add('priority');
		priority.textContent = item.priority;

		// Append elements to Card
		card.appendChild(title);
		card.appendChild(descContainer);
		card.appendChild(due);
		card.appendChild(priority);

		return card;
	}

	const clearInputs = () => {
		let titleInp = document.querySelector('form #title');
		let descInp = document.querySelector('form #desc');
		let dateInp = document.querySelector('form #date');
		let timeInp = document.querySelector('form #time');
		let priorityInp = document.querySelector('form #priority');
		let createProj = document.querySelector('form #create-proj');

		titleInp.value = '';
		descInp.value = '';
		dateInp.value = '';
		timeInp.value = '';
		priorityInp.value = 'default';
		createProj.value = '';
	}

	const dateFormat = (date, time) => {
		// DATE and TIME vars set to check if user inputted time or date or both

		let DATE = false,
		TIME = false,
		newDate = parseISO(date),
		newTime;

		// Check if date is filled out
		if (date !== '') {
			DATE = true

			// Check if date is in the past
			if (isPast(newDate)) {
				alert('INVALID Date: Date is in the past');
				return false;

			// Check if date is less than a week from now -- If so output will be a weekday 
			} else if (formatDistanceToNow(newDate).slice(0,1) <= 7) {
				newDate = format(newDate, 'EEEEEEE')
			} else {
				newDate = format(newDate, 'PPP')
			}
		}

		if (time !== '') {
			TIME = true
			
			// Convert to 12 hour time
			let hour = time.slice(0,2);
			let mins = time.slice(3);
			let mornNight = 'am';
			if(hour > 12) {
				hour -= 12;
				mornNight = 'pm';
			} else if (hour === '00') {
				hour = 12
			}
			newTime = `${hour}:${mins}${mornNight}`
		}

		if (DATE && TIME) {
			return `${newDate} \n ${newTime}`;
		} else if (DATE) {
			return newDate;
		} else if (TIME) {
			return newTime;
		} else {
			throw 'ERROR: WRONG DATE FORMAT';
		}
	}

	// This function will run when the submit button is clicked
	const subTodo = () => {
		// Get values of inputs
		let titleInp = document.querySelector('form #title');
		let descInp = document.querySelector('form #desc');
		let dateInp = document.querySelector('form #date');
		let timeInp = document.querySelector('form #time');
		let priorityInp = document.querySelector('form #priority');
		let project;

		// Check radio btns
		const radioBtn = document.querySelector('#form-container input[type="radio"]:checked');
		if (radioBtn.id === 'add') {
			project = document.querySelector('form #add-proj').value

			// If no project is selected then use priority
			if (project === 'default') project = priorityInp.value;
		} else if (radioBtn.id === 'create') {
			project = document.querySelector('form #create-proj').value
		} else {
			console.log('ERROR adding project to ToDo');
		}

		// If date input is in the past, dateFormat will return false and thus return out of submitting the form
		if (dateFormat(dateInp.value, timeInp.value) === false) { return }

		// Create Todo
		let newTodo = Todo(titleInp.value, descInp.value, dateFormat(dateInp.value, timeInp.value), priorityInp.value, project);
		console.log(newTodo)

		// Create card to hold Obj
		let card = createCard(newTodo);

		// Create and add Todo to Project sidebar and Content Project
		if (radioBtn.id === 'add') {
			let dropdown = document.querySelector(`#sidebar #${project}`)
			projects.addTodo(dropdown, newTodo)
			
			// Check if due date is upcoming or not
			// If so add project to upcoming group instead of Project group
			if (projects.checkUpcoming(dateInp.value)) {
				const upcomingDrop = document.querySelector('#content #upcoming');

				upcomingDrop.appendChild(card);
			} else {
			let contentDropdown = document.querySelector(`#content #${project}`)
			contentDropdown.appendChild(card);
			contentDropdown.classList.remove('hide');
			}
		} else if (radioBtn.id === 'create') {
			if (projects.checkUpcoming(dateInp.value)) {
				const upcomingDrop = document.querySelector('#content #upcoming');

				upcomingDrop.appendChild(card);
			} else {
				projects.addTodo(projects.addToSidebar(project), newTodo)
				projects.addToContent(project, card);
			}
		}

		// Clear form inputs
		clearInputs()
		
		return { newTodo }
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
		// Check if dropdown is in sidebar
		if (dropdown.parentElement === document.querySelector('#sidebar')) {
			// Toggle dropdown
			if (dropdown.lastElementChild.style.display === 'block') {
			dropdown.lastElementChild.style.display = 'none';
			} else {
				dropdown.lastElementChild.style.display = 'block';
			}
		// Check if dropdown is in content
		} else if (dropdown.parentElement === document.querySelector('#content')) {
			const ddChildren = Array.from(dropdown.children)

			ddChildren.forEach(child => {
				// Show/hide each child element except for heading
				if (child !== ddChildren[0]) {
					if (child.style.display === 'none') {
						child.style.display = 'grid';
					} else {
						child.style.display = 'none';
					}
				}
			})
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

		// Add ToDo to a project in the sidebar
		const addTodo = (projectDropdown, todo) => {
			const ul = projectDropdown.lastElementChild.lastElementChild;
			const li = document.createElement('li');

			li.textContent = todo.title
			ul.appendChild(li);
		}

		// Add dropdown to content
		const addToContent = (name, card) => {
			// Create dropdown -- class and id
			const dropdown = document.createElement('div');
			dropdown.classList.add('dropdown');
			dropdown.id = name;

			// Create heading
			const head = document.createElement('h6');
			head.textContent = name;

			// Add elements to dropdown
			dropdown.appendChild(head);
			dropdown.appendChild(card);

			// Add listener to new dropdown
			dropdown.addEventListener('click', toggleDropdown(dropdown));

			// Add dropdown to content
			content.appendChild(dropdown);
		}

		// Check if ToDo date is upcoming
		const checkUpcoming = (date) => {
			let newDate = parseISO(date);
			let distance = formatDistanceToNow(newDate);

			console.log(distance)
			// if date is less than a week
			if (distance.slice(0,1) <= 7) {
				return true;
			} else if (distance.includes('hour')){
				return true;
			} else if (distance.includes('minute')) {
				return true;
			} else {
				return false;
			}
		}

		return { addToSidebar, addTodo, addToContent, checkUpcoming }
	})()

	return { subTodo, checkRequired, content, toggleDropdown, projects, clearInputs }
})()