// Main File

import { dom } from "./dom";

// Declare array to hold ToDo Obj
let toDos = [];
// Get dropdowns
let dropdowns = document.querySelectorAll('.dropdown');

// Sidebar Project Dropdown
// Add listeners to dropdowns to toggle dropdown on click
dropdowns.forEach(project => project.addEventListener('click', () => dom.toggleDropdown(project)));

// New ToDo Button
const addBtn = document.querySelector('button.add-new');
addBtn.addEventListener('click', () => {
	const formContainer = document.querySelector('#form-container');

	formContainer.style.display = 'flex';
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

	dom.content.appendChild(item.card);

	// Toggle Form Off
	const formContainer = document.querySelector('#form-container');
	formContainer.style.display = 'none';
});

// Add/Create Project listener
const radioBtns = document.querySelectorAll('#form-container input[type="radio"]');
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
