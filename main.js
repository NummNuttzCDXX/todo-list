/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dom: () => (/* binding */ dom)\n/* harmony export */ });\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n// Dom Manipulation Module\r\n\r\n\r\nconst dom = (() => {\r\n\tconst content = document.querySelector('#content');\r\n\r\n\tconst createCard = (item) => {\r\n\t\tconst card = document.createElement('div');\r\n\t\tcard.classList.add('card');\r\n\r\n\t\t// Title\r\n\t\tconst title = document.createElement('div');\r\n\t\ttitle.classList.add('title');\r\n\t\ttitle.textContent = item.title;\r\n\r\n\t\t// Description\r\n\t\tconst descContainer = document.createElement('div');\r\n\t\tdescContainer.classList.add('desc');\r\n\r\n\t\tconst descHead = document.createElement('h5');\r\n\t\tdescHead.classList.add('head');\r\n\t\tdescHead.textContent = 'Description: ';\r\n\r\n\t\tconst descContent = document.createElement('span');\r\n\t\tdescContent.textContent = item.desc;\r\n\r\n\t\tdescContainer.appendChild(descHead);\r\n\t\tdescContainer.appendChild(descContent);\t\t\r\n\r\n\t\t// Due Date\r\n\t\tconst due = document.createElement('div');\r\n\t\tdue.classList.add('due');\r\n\t\tdue.textContent = item.due;\r\n\r\n\t\t// Priority\r\n\t\tconst priority = document.createElement('div');\r\n\t\tpriority.classList.add('priority');\r\n\t\tpriority.textContent = item.priority;\r\n\r\n\t\t// Append elements to Card\r\n\t\tcard.appendChild(title);\r\n\t\tcard.appendChild(descContainer);\r\n\t\tcard.appendChild(due);\r\n\t\tcard.appendChild(priority);\r\n\r\n\t\treturn card;\r\n\t}\r\n\r\n\tconst clearInputs = () => {\r\n\t\tlet titleInp = document.querySelector('form #title');\r\n\t\tlet descInp = document.querySelector('form #desc');\r\n\t\tlet dueInp = document.querySelector('form #due');\r\n\t\tlet priorityInp = document.querySelector('form #priority');\r\n\t\tlet createProj = document.querySelector('form #create-proj');\r\n\r\n\t\ttitleInp.value = '';\r\n\t\tdescInp.value = '';\r\n\t\tdueInp.value = '';\r\n\t\tpriorityInp.value = 'default';\r\n\t\tcreateProj.value = '';\r\n\t}\r\n\r\n\t// This function will run when the submit button is clicked\r\n\tconst subTodo = () => {\r\n\t\t// Get values of inputs\r\n\t\tlet titleInp = document.querySelector('form #title');\r\n\t\tlet descInp = document.querySelector('form #desc');\r\n\t\tlet dueInp = document.querySelector('form #due');\r\n\t\tlet priorityInp = document.querySelector('form #priority');\r\n\t\tlet project;\r\n\r\n\t\t// Check radio btns\r\n\t\tconst radioBtn = document.querySelector('#form-container input[type=\"radio\"]:checked');\r\n\t\tif (radioBtn.id === 'add') {\r\n\t\t\tproject = document.querySelector('form #add-proj').value\r\n\r\n\t\t\t// If no project is selected then use priority\r\n\t\t\tif (project === 'default') project = priorityInp.value;\r\n\t\t} else if (radioBtn.id === 'create') {\r\n\t\t\tproject = document.querySelector('form #create-proj').value\r\n\t\t} else {\r\n\t\t\tconsole.log('ERROR adding project to ToDo');\r\n\t\t}\r\n\r\n\t\t// Create Todo\r\n\t\tlet newTodo = (0,_todo__WEBPACK_IMPORTED_MODULE_0__.Todo)(titleInp.value, descInp.value, dueInp.value, priorityInp.value, project);\r\n\r\n\t\t// Create and add Todo to Project sidebar\r\n\t\tif (radioBtn.id === 'add') {\r\n\t\t\tlet dropdown = document.querySelector('#' + project)\r\n\t\t\tprojects.addTodo(dropdown, newTodo)\r\n\t\t} else if (radioBtn.id === 'create') {\r\n\t\t\tprojects.addTodo(projects.addToSidebar(project), newTodo)\r\n\t\t}\r\n\r\n\t\t// Create card to hold Obj\r\n\t\tlet card = createCard(newTodo);\r\n\r\n\t\t// Clear form inputs\r\n\t\tclearInputs()\r\n\t\t\r\n\t\treturn { newTodo, card }\r\n\t}\r\n\r\n\tconst checkRequired = () => {\r\n\t\tconst reqFields = document.querySelectorAll('form :required');\r\n\t\t// Declare var to tell if check passed or not\r\n\t\tlet pass = true;\r\n\r\n\t\treqFields.forEach(input => {\r\n\t\t\tif (input.nodeName === 'SELECT') {\r\n\t\t\t\tif (input.value === 'default') {\r\n\t\t\t\t\tinput.classList.add('fail');\r\n\t\t\t\t\tpass = false\r\n\t\t\t\t};\r\n\t\t\t} else if (input.value === '') {\r\n\t\t\t\tinput.classList.add('fail');\r\n\t\t\t\tpass = false\r\n\t\t\t};\r\n\t\t})\r\n\r\n\t\treturn pass;\r\n\t}\r\n\r\n\tconst toggleDropdown = (dropdown) => {\r\n\t\tif (dropdown.lastElementChild.style.display === 'block') {\r\n\t\t\tdropdown.lastElementChild.style.display = 'none';\r\n\t\t} else {\r\n\t\t\tdropdown.lastElementChild.style.display = 'block';\r\n\t\t}\r\n\t}\r\n\r\n\t// Project Module -- For organisation\r\n\tconst projects = (() => {\r\n\t\t// Create and add project dropdown to sidebar\r\n\t\tconst addToSidebar = (name) => {\r\n\t\t\tconst sidebar = document.querySelector('#sidebar');\r\n\r\n\t\t\t// Create the dropdown\r\n\t\t\tconst dropdown = document.createElement('div');\r\n\t\t\tdropdown.classList.add('dropdown');\r\n\t\t\tdropdown.id = name;\r\n\r\n\t\t\tconst project = document.createElement('p');\r\n\t\t\tproject.textContent = name;\r\n\t\t\tdropdown.appendChild(project);\r\n\r\n\t\t\t// Create and add the dropdown-content\r\n\t\t\tconst dropContent = document.createElement('div');\r\n\t\t\tdropContent.classList.add('dropdown-content');\r\n\t\t\tdropdown.appendChild(dropContent);\r\n\r\n\t\t\tconst ul = document.createElement('ul');\r\n\t\t\tdropContent.appendChild(ul);\r\n\r\n\t\t\t// Add the listener for dropdown menu\r\n\t\t\tdropdown.addEventListener('click', () => toggleDropdown(dropdown));\r\n\r\n\t\t\t// Add dropdown to sidebar\r\n\t\t\tsidebar.appendChild(dropdown);\r\n\r\n\t\t\treturn dropdown;\r\n\t\t}\r\n\r\n\t\t// Add ToDo to a project on the DOM\r\n\t\tconst addTodo = (projectDropdown, todo) => {\r\n\t\t\tconst ul = projectDropdown.lastElementChild.lastElementChild;\r\n\t\t\tconst li = document.createElement('li');\r\n\r\n\t\t\tli.textContent = todo.title\r\n\t\t\tul.appendChild(li);\r\n\t\t}\r\n\r\n\t\treturn { addToSidebar, addTodo }\r\n\t})()\r\n\r\n\treturn { subTodo, checkRequired, content, toggleDropdown, projects }\r\n})()\n\n//# sourceURL=webpack://todo-list/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n// Main File\r\n\r\n\r\n\r\n// Declare array to hold ToDo Obj\r\nlet toDos = [];\r\n// Get dropdowns\r\nlet dropdowns = document.querySelectorAll('.dropdown');\r\n\r\n// Sidebar Project Dropdown\r\n// Add listeners to dropdowns to toggle dropdown on click\r\ndropdowns.forEach(project => project.addEventListener('click', () => _dom__WEBPACK_IMPORTED_MODULE_0__.dom.toggleDropdown(project)));\r\n\r\n// New ToDo Button\r\nconst addBtn = document.querySelector('button.add-new');\r\naddBtn.addEventListener('click', () => {\r\n\tconst formContainer = document.querySelector('#form-container');\r\n\r\n\tformContainer.style.display = 'flex';\r\n})\r\n\r\n// Submit Button\r\nconst subBtn = document.querySelector('button.submit');\r\nsubBtn.addEventListener('click', () => {\r\n\t// Check required fields are filled\r\n\tif (!_dom__WEBPACK_IMPORTED_MODULE_0__.dom.checkRequired()) {\r\n\t\treturn; // If check fails, return and dont submit\r\n\t} else {\r\n\t\t// If check passes, remove the fail class\r\n\t\tdocument.querySelectorAll('form :required').forEach(input => input.classList.remove('fail'));\r\n\t}\r\n\r\n\tlet item = _dom__WEBPACK_IMPORTED_MODULE_0__.dom.subTodo();\r\n\r\n\ttoDos.push(item.newTodo);\r\n\r\n\t_dom__WEBPACK_IMPORTED_MODULE_0__.dom.content.appendChild(item.card);\r\n\r\n\t// Toggle Form Off\r\n\tconst formContainer = document.querySelector('#form-container');\r\n\tformContainer.style.display = 'none';\r\n});\r\n\r\n// Add/Create Project listener\r\nconst radioBtns = document.querySelectorAll('#form-container input[type=\"radio\"]');\r\nradioBtns.forEach(btn => btn.addEventListener('change', () => {\r\n\tconst addProj = document.querySelector('label[for=\"add-proj\"]');\r\n\tconst createProj = document.querySelector('label[for=\"create-proj\"]');\r\n\tconst radioAdd = document.querySelector('input#add')\r\n\r\n\tif (radioAdd.checked) {\r\n\t\taddProj.classList.remove('hide');\r\n\t\tcreateProj.classList.add('hide');\r\n\t} else {\r\n\t\taddProj.classList.add('hide');\r\n\t\tcreateProj.classList.remove('hide');\r\n\t}\r\n}))\r\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Todo: () => (/* binding */ Todo)\n/* harmony export */ });\n// ToDo Module\r\n\r\n// ToDo Object Constructor -- Factory\r\nconst Todo = (title, desc, due, priority, project) => {\r\n\tlet completed = false;\r\n\r\n\tconst setPriority = (newPriority) => {\r\n\t\tpriority = newPriority;\r\n\t\treturn newPriority;\r\n\t}\r\n\r\n\treturn {title, desc, due, priority, setPriority, project, completed}\r\n}\r\n\n\n//# sourceURL=webpack://todo-list/./src/todo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;