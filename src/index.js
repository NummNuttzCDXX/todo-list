// Main File

import { dom } from "./dom";

// Declare array to hold ToDo Obj and projects
export let toDos = [];

// Load locally stored data
dom.renderInfo();

// Add Menu Button Listener (for mobile)
const menuBtn = document.querySelector('#menu-icon');
menuBtn.addEventListener('click', () => document.querySelector('#sidebar').classList.toggle('fly-in'));

// Add listeners to dropdowns to toggle dropdown on click
let dropdowns = document.querySelectorAll('#sidebar .dropdown');
dropdowns.forEach(project => project.addEventListener('click', () => dom.toggleDropdown(project)));

// Add dropdown listener to cards
let cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', () => dom.toggleCardDrop(card)));

// Completed Checkbox 
const checkboxs = document.querySelectorAll('.checkbox');
checkboxs.forEach(box => {
	// Get todo
	const index = box.parentElement.parentElement.getAttribute('data');
	box.addEventListener('click', () => dom.toggleCheckbox(box, toDos[index]))
})

// Add Delete Todo listener
cards.forEach(card => {
	const delBtn = card.lastElementChild.lastElementChild;
	delBtn.addEventListener('click', () => { dom.deleteCard(card) });
})

// Add Dropdown Project Delete listener
let projDel = document.querySelectorAll('.proj-del');
projDel.forEach(btn => btn.addEventListener('click', () => {
	// First, Toggle the dropdown so it doesnt try to drop when its not there anymore
	dom.toggleDropdown(btn.parentElement.parentElement);
	dom.projects.removeProject(btn); // Then, run main func
}))

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

	dom.subTodo();

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
let editBtn = document.querySelectorAll('.card .priority img:nth-child(1)');
editBtn.forEach(btn => btn.addEventListener('click', () => { dom.editCard(btn) }))

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

// Delete local data 
const delDataBtn = document.querySelector('button.delete');
delDataBtn.addEventListener('click', () => {
	const input = prompt('Are you sure? (y/n)')
	if (input === 'y' || input === 'yes') {
		window.localStorage.clear();
		alert('Deleting locally stored data');
	} else if (input === 'n' || input === 'no') {
		return;
	}
})
