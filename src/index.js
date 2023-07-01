// Main File

import { dom } from "./dom";

// Declare array to hold ToDo Obj
let toDos = [];

// New ToDo Button
const addBtn = document.querySelector('button.add-new');
addBtn.addEventListener('click', () => {
	const formContainer = document.querySelector('#form-container');

	formContainer.style.display = 'flex';
})

// Submit Button
const subBtn = document.querySelector('button.submit');
subBtn.addEventListener('click', () => {
	let item = dom.subTodo();

	toDos.push(item.newTodo);

	dom.content.appendChild(item.card);
	
	// Toggle Form Off
	const formContainer = document.querySelector('#form-container');
	formContainer.style.display = 'none';
});
