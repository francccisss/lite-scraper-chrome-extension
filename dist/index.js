import Event_Signal from "./utils/pubsub.js";
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
function set_task_active() { }
add_task_btn?.addEventListener("click", (e) => {
    sidebar.prepend(create_task_component());
    function cb(data) {
        console.log(data);
    }
    Event_Signal.subscribe("new", cb);
});
sidebar?.addEventListener("click", (e) => {
    Event_Signal.publish("new", "gago");
    const target = e.target;
    if (target.classList.contains("task-item")) {
        target.classList.contains("active") ? null : target.classList.add("active");
        console.log(target);
    }
});
