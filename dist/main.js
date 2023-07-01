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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dom: () => (/* binding */ dom)\n/* harmony export */ });\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n// Dom Manipulation Module\r\n\r\n\r\nconst dom = (() => {\r\n\tconst content = document.querySelector('#content');\r\n\r\n\t// Get values of inputs -- Globally\r\n\tlet titleInp = document.querySelector('form #title');\r\n\tlet descInp = document.querySelector('form #desc');\r\n\tlet dueInp = document.querySelector('form #due');\r\n\tlet priorityInp = document.querySelector('form #priority');\r\n\t// This will take the value of inputs and create new object\r\n\tconst createTodo = () => {\r\n\t\tlet newTodo = (0,_todo__WEBPACK_IMPORTED_MODULE_0__.Todo)(titleInp.value, descInp.value, dueInp.value, priorityInp.value);\r\n\r\n\t\treturn newTodo;\r\n\t}\r\n\r\n\tconst createCard = (item) => {\r\n\t\tconst card = document.createElement('div');\r\n\t\tcard.classList.add('card');\r\n\r\n\t\tconst title = document.createElement('div');\r\n\t\ttitle.classList.add('title');\r\n\t\ttitle.textContent = item.title;\r\n\r\n\t\tconst desc = document.createElement('div');\r\n\t\tdesc.classList.add('desc');\r\n\t\tdesc.textContent = item.desc;\r\n\r\n\t\tconst due = document.createElement('div');\r\n\t\tdue.classList.add('due');\r\n\t\tdue.textContent = item.due;\r\n\r\n\t\tconst priority = document.createElement('div');\r\n\t\tpriority.classList.add('priority');\r\n\t\tpriority.textContent = item.priority;\r\n\r\n\t\tcard.appendChild(title);\r\n\t\tcard.appendChild(desc);\r\n\t\tcard.appendChild(due);\r\n\t\tcard.appendChild(priority);\r\n\r\n\t\treturn card;\r\n\t}\r\n\r\n\tconst clearInputs = () => {\r\n\t\ttitleInp.value = '';\r\n\t\tdescInp.value = '';\r\n\t\tdueInp.value = '';\r\n\t\tpriorityInp.value = 'default';\r\n\t}\r\n\r\n\t// This function will run when the submit button is clicked\r\n\tconst subTodo = () => {\r\n\t\t// Create new Todo Object\r\n\t\tlet newTodo = createTodo();\r\n\r\n\t\t// Create card to hold Obj\r\n\t\tlet card = createCard(newTodo);\r\n\r\n\t\t// Clear form inputs\r\n\t\tclearInputs()\r\n\t\t\r\n\t\treturn { newTodo, card }\r\n\t}\r\n\r\n\treturn { subTodo, content }\r\n})()\n\n//# sourceURL=webpack://todo-list/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n// Main File\r\n\r\n\r\n\r\n// Declare array to hold ToDo Obj\r\nlet toDos = [];\r\n\r\n// New ToDo Button\r\nconst addBtn = document.querySelector('button.add-new');\r\naddBtn.addEventListener('click', () => {\r\n\tconst formContainer = document.querySelector('#form-container');\r\n\r\n\tformContainer.style.display = 'flex';\r\n})\r\n\r\n// Submit Button\r\nconst subBtn = document.querySelector('button.submit');\r\nsubBtn.addEventListener('click', () => {\r\n\tlet item = _dom__WEBPACK_IMPORTED_MODULE_0__.dom.subTodo();\r\n\r\n\ttoDos.push(item.newTodo);\r\n\r\n\t_dom__WEBPACK_IMPORTED_MODULE_0__.dom.content.appendChild(item.card);\r\n\t\r\n\t// Toggle Form Off\r\n\tconst formContainer = document.querySelector('#form-container');\r\n\tformContainer.style.display = 'none';\r\n});\r\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Todo: () => (/* binding */ Todo)\n/* harmony export */ });\n// ToDo Module\r\n\r\n// ToDo Object Constructor -- Factory\r\nconst Todo = (title, desc, due, priority) => {\r\n\tlet completed = false;\r\n\r\n\tconst setPriority = (newPriority) => {\r\n\t\tpriority = newPriority;\r\n\t\treturn newPriority;\r\n\t}\r\n\r\n\treturn {title, desc, due, priority, setPriority, completed}\r\n}\r\n\n\n//# sourceURL=webpack://todo-list/./src/todo.js?");

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