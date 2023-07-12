// Dom Manipulation Module
import { Todo } from "./todo";
import { toDos } from "./index";
import { store } from "./storage";
import { format, parseISO, formatDistanceToNow, isPast } from "date-fns";
import editIcon from './img/pencil.svg';
import dropArrow from './img/expand_more_dropdown.svg';
import closeX from './img/close-X.svg';
import blankCheckbox from './img/check_box_blank.svg';
import checkedBox from './img/select_check_box.svg';

export const dom = (() => {
	const content = document.querySelector('#content');

	const createCard = (item) => {
		const card = document.createElement('div');
		card.classList.add('card', item.priority);

		// Add index to card data attr
		card.setAttribute('data', toDos.length - 1)

		// Title
		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = item.title;

		// Checkbox to Title
		const checkbox = new Image();
		checkbox.classList.add('checkbox', 'incomplete');
		checkbox.src = blankCheckbox;
		checkbox.alt = 'Empty Checkbox';
		title.prepend(checkbox);

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
		
		// Priority Icon
		const edit = new Image();
		edit.src = editIcon;
		edit.alt = 'Pencil Icon(Edit)';
		priority.appendChild(edit);

		// Delete todo btn
		const del = new Image();
		del.src = closeX;
		del.alt = 'Delete Todo';
		priority.appendChild(del);

		// Append elements to Card
		card.appendChild(title);
		card.appendChild(descContainer);
		card.appendChild(due);
		card.appendChild(priority);

		return card;
	}

	const addCardListeners = (card = HTMLDivElement) => {
		// Get card btns
		const editBtn = card.lastElementChild.firstElementChild;
		const delBtn = card.lastElementChild.lastElementChild;
		const checkbox = card.firstElementChild.firstElementChild;

		// Add listeners
		// Checkbox
		checkbox.addEventListener('click', () => {
			toggleCheckbox(checkbox, toDos[card.getAttribute('data')]);
		})
		// Edit Icon
		editBtn.addEventListener('click', () => editCard(editBtn));
		// Delete Todo Btn
		delBtn.addEventListener('click', () => deleteCard(card));
		// Card Collapse
		card.addEventListener('click', () => toggleCardDrop(card));
	}

	// This function gets run on Edit Icon Click
	const editCard = (editBtn) => {
		// Toggle card drop
		toggleCardDrop(editBtn.parentElement.parentElement)

		// Show edit form/Hide add form
		showForm(document.querySelector('form#edit'));

		// Save editted card for later use
		let editCard = editBtn.parentElement.parentElement;

		// Edit Form Submit Button
		const editSubBtn = document.querySelector('#edit button');
		editSubBtn.addEventListener('click', editTodo)

		// Nested Function: Gets run on Edit Form Submit Btn
		function editTodo() {
			let todoEdit = toDos[editCard.getAttribute('data')];
			let items = subEdit(editCard, todoEdit);

			// hide form
			document.querySelector('#form-container').style.display = 'none';

			// Remove listener
			editSubBtn.removeEventListener('click', editTodo)
		}
	}

	// Delete Todo and Card off DOM -- Runs when X is clicked
	const deleteCard = (card) => {
		// Delete todo from array
		// Empty space should be fixed on page reload
		delete toDos[card.getAttribute('data')]; // All data attr on cards would be wrong if we removed the empty space in array
		card.remove(); // Remove Card
		// Update local storage
		store.todos.update(toDos);
	}

	// Toggle Checkbox -- Will run on checkbox click
	const toggleCheckbox = (box, todo) => {
		toggleCardDrop(box.parentElement.parentElement)

		if (box.classList.contains('incomplete')) {
			box.classList.remove('incomplete');
			box.classList.add('complete');

			box.src = checkedBox;
			box.alt = 'Completed Checkbox';

			if (todo === undefined) { return; }
			todo.completed = true;
		} else if (box.classList.contains('complete')) {
			box.classList.add('incomplete');
			box.classList.remove('complete');

			box.src = blankCheckbox;
			box.alt = 'Empty Checkbox';

			if (todo === undefined) { return; }
			todo.completed = false;
		} else {
			// ERROR CHECK
			console.log('ERROR: CHECKBOX FAILED');
		}
	}

	const toggleCardDrop = (card) => {
		const children = card.children;
		const desc = children[1];
		const priority = children[3];

		if (card.classList.contains('collapse')) {
			card.classList.remove('collapse');
			card.style.display = 'grid';
			priority.style.display = 'flex';
			desc.style.display = 'flex';
		} else {
			card.classList.add('collapse');
			card.style.display = 'flex';
			priority.style.display = 'none';
			desc.style.display = 'none';
		}
	}

	const clearInputs = () => {
		// 'Add' inputs
		let titleInp = document.querySelector('form #title');
		let descInp = document.querySelector('form #desc');
		let dateInp = document.querySelector('form #date');
		let timeInp = document.querySelector('form #time');
		let priorityInp = document.querySelector('form #priority');
		let createProj = document.querySelector('form #create-proj');
		let addRadio = document.querySelector('#new #add');
		// 'Edit' inputs
		const title = document.querySelector('#edit #new-title');
		const desc = document.querySelector('#edit #new-desc');
		const date = document.querySelector('#edit #new-date');
		const time = document.querySelector('#edit #new-time');
		const priority = document.querySelector('#edit #new-priority');
		const editCreateProj = document.querySelector('#edit #edit-create-proj');
		const editAddRadio = document.querySelector('#edit #edit-add');

		// 'Add' inputs
		titleInp.value = '';
		descInp.value = '';
		dateInp.value = '';
		timeInp.value = '';
		priorityInp.value = 'default';
		createProj.value = '';
		addRadio.checked = true;

		// 'Edit' inputs
		title.value = '';
		desc.value = '';
		date.value = '';
		time.value = '';
		priority.value = 'default';
		editCreateProj.value = '';
		editAddRadio.checked = true;
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
		const radioBtn = document.querySelector('#new input[type="radio"]:checked');
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
		toDos.push(newTodo);

		// Create card to hold Obj
		const card = createCard(newTodo);

		// Add Card Listeners
		addCardListeners(card);

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
				projects.addToContent(project, card);
			}
			projects.addTodo(projects.addToSidebar(project), newTodo)
		}

		// Clear form inputs
		clearInputs()

		// locally store new Todo
		store.todos.update(toDos)
		
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
		// Check if dropdown is in sidebar
		if (dropdown.parentElement === document.querySelector('#sidebar')) {
			// Toggle dropdown
			if (dropdown.lastElementChild.style.display === 'block') {
			dropdown.lastElementChild.style.display = 'none';
			} else {
				dropdown.lastElementChild.style.display = 'block';
			}
			// Toggle Dropdown Arrow flip
			toggleArrowFlip(dropdown.firstElementChild.firstElementChild)

		// Else dropdown is in content
		} else {
			try {
				// Catch possible error when deleting newly created groups
				const children = Array.from(dropdown.parentElement.children);
			} catch (TypeError) {
				throw 'Cannot dropdown Project that isnt there lol dummy \n Nothing is wrong... Carry on'
			}

			// Get an Array of the dropdown parent's children
			const children = Array.from(dropdown.parentElement.children);
			children.forEach(child => {
				// Show/hide each child element except for heading
				if (child !== children[0]) {
					if (child.style.display === 'none') {
						if (child.classList.contains('collapse')) {
							child.style.display = 'flex';
						} else {
							child.style.display = 'grid';
						}
					} else {
						child.style.display = 'none';
					}
				}
			})
			// Toggle dropdown arrow flip
			toggleArrowFlip(dropdown.children[0])
		}

		// Toggle arrow flip nested function
		function toggleArrowFlip(arrow) {
			if (arrow.classList.contains('flip')) {
				arrow.classList.remove('flip');
			} else if (!arrow.classList.contains('flip')) {
				arrow.classList.add('flip');
			};
		};
	}

	const showForm = (form) => {
		const formContainer = document.querySelector('#form-container');
		const formAdd = document.querySelector('form#new');
		const formEdit = document.querySelector('form#edit');

		formContainer.style.display = 'flex';

		if (form === formAdd) {
			formAdd.classList.remove('hide');
			formEdit.classList.add('hide');
		} else if (form === formEdit) {
			formAdd.classList.add('hide');
			formEdit.classList.remove('hide');
		} else {
			alert('ERROR: showForm()');
		}
	}

	const subEdit = (card, todo) => {
		const title = document.querySelector('#edit #new-title');
		const desc = document.querySelector('#edit #new-desc');
		const date = document.querySelector('#edit #new-date');
		const time = document.querySelector('#edit #new-time');
		const priority = document.querySelector('#edit #new-priority');
		let project;

		// Remove old todo from Project sidebar
		projects.removeTodoSide(todo, todo.project)
		
		// Check Project radio buttons
		const radio = document.querySelector('#edit input[type="radio"]:checked');
		if (radio.id === 'edit-add') {
			project = document.querySelector('#edit #edit-proj').value

			if (project === 'default') project = priority.value;
		} else if (radio.id === 'edit-create') {
			project = document.querySelector('#edit #edit-create-proj').value;
		} else { alert('ERROR: Editting Project Failed') }; // ERROR catch

		// Set new values to todo object
		todo.title = title.value;
		todo.desc = desc.value;
		todo.due = dateFormat(date.value, time.value);
		todo.priority = priority.value;
		todo.project = project;

		// Update local storage
		store.todos.update(toDos);

		// Remove old card and Create new one
		const index = card.getAttribute('data'); // Get index of card
		const newCard = createCard(todo);
		newCard.classList.add(priority.value)
		newCard.setAttribute('data', index);
		card.remove()

		// Create and add Todo to Project sidebar and Content Project
		if (radio.id === 'edit-add') {
			let dropdown = document.querySelector(`#sidebar #${project}`)
			projects.addTodo(dropdown, todo)
			
			// Check if due date is upcoming or not
			// If so add project to upcoming group instead of Project group
			if (projects.checkUpcoming(date.value)) {
				const upcomingDrop = document.querySelector('#content #upcoming');

				upcomingDrop.appendChild(newCard);
			} else {
				let contentDropdown = document.querySelector(`#content #${project}`)
				contentDropdown.appendChild(newCard);
				contentDropdown.classList.remove('hide');
			}
		} else if (radio.id === 'edit-create') {
			if (projects.checkUpcoming(date.value)) {
				const upcomingDrop = document.querySelector('#content #upcoming');

				upcomingDrop.appendChild(newCard);
			} else {
				projects.addTodo(projects.addToSidebar(project), todo)
				projects.addToContent(project, newCard);
			}
		}

		clearInputs()

		return { card: newCard }
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
			// Add dropdown arrow to P
			const arrow = new Image();
			arrow.src = dropArrow;
			arrow.alt = 'Dropdown Arrow';
			arrow.classList.add('dropdown-arrow')
			project.appendChild(arrow);
			dropdown.appendChild(project)
			// Add Delete btn to P
			const del = new Image();
			del.src = closeX;
			del.alt = 'Delete Project';
			del.classList.add('proj-del');
			del.addEventListener('click', () => {
				// First, Toggle dropdown so it doesnt try to drop elements that arent there anymore
				toggleDropdown(del.parentElement.parentElement);
				removeProject(del); // Then, run main func
			});
			project.appendChild(del);

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

			addToSelect(name)

			return dropdown;
		}

		// Remove project from sidebar and content
		const removeProject = (btn) => {
			const project = btn.parentElement.parentElement;
			
			// Get cards inside that project
			const cards = Array.from(document.querySelector(`#content #${project.id}`).children);
			// Loop through cards to get the todos and move them to a Priority Project
			// So the Todo's aren't deleted
			let todo;
			cards.forEach(card => {
				// Do nothing for the h6 in the div
				if(card.classList.contains('card')) {
					const index = card.getAttribute('data');
					todo = toDos[index];

					// Add card to #content Project Priority
					const contentPriority = document.querySelector(`#content #${todo.priority}`)
					contentPriority.appendChild(card);
					contentPriority.classList.remove('hide');

					// Update todo.project
					todo.project = todo.priority
				}
			})

			// Add todo to Priority Project on sidebar
			addTodo(document.querySelector(`#sidebar #${todo.priority}`), todo);

			// Delete Project from content
			document.querySelector(`#content #${project.id}`).remove();

			// Delete project from sidebar
			project.remove()

			// Remove project option from select box
			removeFromSelect(project.id.toLowerCase());

			// Update local storage
			store.todos.update(toDos);
		}

		// Add ToDo to a project in the sidebar
		const addTodo = (projectDropdown, todo) => {
			const ul = projectDropdown.lastElementChild.lastElementChild;
			const li = document.createElement('li');

			li.textContent = todo.title
			ul.appendChild(li);
		}

		const removeTodoSide = (todo, projName) => {
			// Get Project dropdown
			const project = document.querySelector(`#sidebar #${projName}`);
			// Get list elements -- Todo's
			const children = Array.from(project.lastElementChild.firstElementChild.children);

			children.forEach(child => {
				if (child.textContent === todo.title) {
					child.remove()
				}
			})
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
			// Add dropdown arrow to head
			const arrow = new Image();
			arrow.src = dropArrow;
			arrow.alt = 'Dropdown Arrow';
			arrow.classList.add('dropdown-arrow')
			head.appendChild(arrow);

			// Add elements to dropdown
			dropdown.appendChild(head);
			dropdown.appendChild(card);

			// Add listener to new dropdown
			head.addEventListener('click', () => toggleDropdown(head));

			// Add dropdown to content
			content.appendChild(dropdown);
		}

		const addToSelect = (name) => {
			const newSelect = document.querySelector('form #add-proj');
			const editSelect = document.querySelector('form #edit-proj');
			const selectBoxs = [newSelect, editSelect];

			selectBoxs.forEach(box => {
				const opt = document.createElement('option');
				const nameLower = name.toLowerCase();

				opt.setAttribute('value', nameLower);
				opt.textContent = name;

				box.appendChild(opt);
			})
		}

		const removeFromSelect = (name) => {
			const newSelect = document.querySelector('form #add-proj');
			const editSelect = document.querySelector('form #edit-proj');
			const selectBoxs = [newSelect, editSelect];

			selectBoxs.forEach(box => {
				const children = Array.from(box.children);
				children.forEach(child => {
					if (child.value === name.toLowerCase()) child.remove();
				})
			})
		}

		// Check if ToDo date is upcoming
		const checkUpcoming = (date) => {
			if (date === '') { return false; }
			let newDate = parseISO(date);
			let distance = formatDistanceToNow(newDate);

			// if date is less than a week
			if (distance.slice(0,2) <= 7) {
				return true;
			} else if (distance.includes('hour')){
				return true;
			} else if (distance.includes('minute')) {
				return true;
			} else {
				return false;
			}
		}

		return { addToSidebar, addTodo, addToContent, checkUpcoming, removeTodoSide, removeProject }
	})()

	// Place saved Projects and Todos on the DOM
	const renderInfo = () => {
		if (store.todos.get() === false) {
			// If func returns false, do nothing -- return out of this func
			return;
		}
		// Retrieve locally stored data
		const todos = store.todos.get();

		todos.forEach(todo => {
			if (todo !== null) {
				toDos.push(todo); // Re-Add todo Obj to Array
				const card = createCard(todo); // Create new card for each todo

				// If Custom Project -- Add Project and Todo to sidebar
				if (todo.project !== todo.priority) {
					// Add to sidebar
					projects.addTodo(projects.addToSidebar(todo.project), todo);
					// Add to content
					projects.addToContent(todo.project, card);
				} else { // Else, Default Project
					// Add to Content
					const contentDropdown = document.querySelector(`#content #${todo.priority}`);
					contentDropdown.appendChild(card);
					contentDropdown.classList.remove('hide');
					// Add to Sidebar
					const sideDropdown = document.querySelector(`#sidebar #${todo.priority}`);
					projects.addTodo(sideDropdown, todo);
				}
			}
		})
	}

	return { subTodo, checkRequired, content, toggleDropdown, projects, clearInputs, toggleCardDrop, showForm, subEdit, editCard, renderInfo,
			toggleCheckbox, deleteCard }
})()