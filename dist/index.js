"use strict";
const sidebar = document.getElementById("sidebar");
const add_task_btn = document.getElementById("add-task");
function create_task_component() {
    const task_container = document.createElement("div");
    const task_icon = document.createElement("span");
    const task_title = document.createElement("p");
    task_container.setAttribute("class", "task-item item");
    task_title.textContent = "ROOMMATES";
    task_container.append(task_icon);
    task_container.append(task_title);
    return task_container;
}
add_task_btn?.addEventListener("click", (e) => {
    sidebar.prepend(create_task_component());
});
