"use strict";
const sidebar = document.getElementById("sidebar");
function create_task_component(container) {
    const task_container = document.createElement("div");
    const task_icon = document.createElement("span");
    const task_title = document.createElement("p");
    task_container.setAttribute("class", "task-item item");
    task_title.textContent = "ROOMMATES";
    task_container.append(task_icon);
    task_container.append(task_title);
    container.prepend(task_container);
}
create_task_component(sidebar);
