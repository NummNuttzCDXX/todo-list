// Main File

import { dom } from "./dom";
import { Todo } from "./todo"; //TEMP

// Declare array to hold ToDo Obj
// With Example 
let exampleTodo = Todo('Feed the cat', 'Food and Water', 'Everyday', 'medium', 'medium'); //TEMP
let toDos = [ exampleTodo ];
// Get dropdowns
let dropdowns = document.querySelectorAll('#sidebar .dropdown');

// Sidebar Project Dropdown
// Add listeners to dropdowns to toggle dropdown on click
dropdowns.forEach(project => project.addEventListener('click', () => dom.toggleDropdown(project)));

// Add dropdown listener to cards
let cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', () => dom.toggleCardDrop(card)));

// Content Project Dropdown
let contentDropdown = document.querySelectorAll('#content .dropdown h6');
contentDropdown.forEach(dropdown => dropdown.addEventListener('click', () => dom.toggleDropdown(dropdown)));

// New ToDo Button
const addBtn = document.querySelector('button.add-new');
addBtn.addEventListener('click', () => dom.showForm(document.querySelector('form#new')));

// Close form button
const closeForm = document.querySelector('img.close-box');
closeForm.addEventListener('click', () => {
	const formContainer = document.querySelector('#form-container');

	formContainer.style.display = 'none';
	dom.clearInputs();
})

// Submit Button
const subBtn = document.querySelector('button.submit');
subBtn.addEventListener('click', () => {
	// Check required fields are filled
	if (!dom.checkRequired()) {
		return; // If check fails, return and dont submit
	} else {
		// If check passes, remove the fail class
		document.querySelectorAll('form :required').forEach(input => input.classList.remove('fail'));
	}

	let item = dom.subTodo();

	toDos.push(item.newTodo);

	// Add index to card data attr
	item.card.setAttribute('data', toDos.length - 1)

	// Toggle Form Off
	const formContainer = document.querySelector('#form-container');
	formContainer.style.display = 'none';
});

// Add/Create Project listener
const radioBtns = document.querySelectorAll('#form-container #new input[type="radio"]');
radioBtns.forEach(btn => btn.addEventListener('change', () => {
	const addProj = document.querySelector('label[for="add-proj"]');
	const createProj = document.querySelector('label[for="create-proj"]');
	const radioAdd = document.querySelector('input#add')

	if (radioAdd.checked) {
		addProj.classList.remove('hide');
		createProj.classList.add('hide');
	} else {
		addProj.classList.add('hide');
		createProj.classList.remove('hide');
	}
}))

// Edit Todo listener
let editBtn = document.querySelectorAll('.card .priority img');
let editCard;
editBtn.forEach(btn => btn.addEventListener('click', () => {
	// Toggle card drop
	dom.toggleCardDrop(btn.parentElement.parentElement)

	// Show edit form/Hide add form
	dom.showForm(document.querySelector('form#edit'));

	// Save editted card for later use
	editCard = btn.parentElement.parentElement;
}))

// Edit Add/Create Project Listener
const editRadio = document.querySelectorAll('#edit input[type="radio"]');
editRadio.forEach(btn => btn.addEventListener('change', () => {
	// Get inputs to show/hide
	const addProj = document.querySelector('label[for="edit-proj"]');
	const createProj = document.querySelector('label[for="edit-create-proj"]');
	const radioAdd = document.querySelector('input#edit-add'); // Get radio button

	if (radioAdd.checked) {
		addProj.classList.remove('hide');
		createProj.classList.add('hide');
	} else {
		addProj.classList.add('hide');
		createProj.classList.remove('hide');
	}
}))

// Edit Submit Button
const editSubBtn = document.querySelector('#edit button');
editSubBtn.addEventListener('click', () => {
	let editTodo = toDos[editCard.getAttribute('data')];
	let items = dom.subEdit(editCard, editTodo);

	// hide form
	document.querySelector('#form-container').style.display = 'none';
})
