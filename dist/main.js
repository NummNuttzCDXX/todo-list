(()=>{"use strict";const e=(()=>{const e=document.querySelector("#content");let t=document.querySelector("form #title"),d=document.querySelector("form #desc"),l=document.querySelector("form #due"),o=document.querySelector("form #priority");return{subTodo:()=>{let e={title:t.value,desc:d.value,due:l.value,priority:o.value,setPriority:e=>(e,e),completed:!1};let n=(e=>{const t=document.createElement("div");t.classList.add("card");const d=document.createElement("div");d.classList.add("title"),d.textContent=e.title;const l=document.createElement("div");l.classList.add("desc"),l.textContent=e.desc;const o=document.createElement("div");o.classList.add("due"),o.textContent=e.due;const n=document.createElement("div");return n.classList.add("priority"),n.textContent=e.priority,t.appendChild(d),t.appendChild(l),t.appendChild(o),t.appendChild(n),t})(e);return t.value="",d.value="",l.value="",o.value="default",{newTodo:e,card:n}},checkRequired:()=>{const e=document.querySelectorAll("form :required");let t=!0;return e.forEach((e=>{"SELECT"===e.nodeName?"default"===e.value&&(e.classList.add("fail"),t=!1):""===e.value&&(e.classList.add("fail"),t=!1)})),t},content:e,toggleDropdown:e=>{"block"===e.lastElementChild.style.display?e.lastElementChild.style.display="none":e.lastElementChild.style.display="block"}}})();let t=[];document.querySelectorAll(".dropdown").forEach((t=>t.addEventListener("click",(()=>e.toggleDropdown(t))))),document.querySelector("button.add-new").addEventListener("click",(()=>{document.querySelector("#form-container").style.display="flex"})),document.querySelector("button.submit").addEventListener("click",(()=>{if(!e.checkRequired())return;document.querySelectorAll("form :required").forEach((e=>e.classList.remove("fail")));let d=e.subTodo();t.push(d.newTodo),e.content.appendChild(d.card),document.querySelector("#form-container").style.display="none"}))})();