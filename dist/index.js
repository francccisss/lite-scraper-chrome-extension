import Event_Signal from "./utils/pubsub.js";
import { update_config_ui } from "./form_input_handlers.js";
import { create_task_component } from "./ui.js";
const sidebar = document.getElementById("sidebar");
const add_task_btn = document.getElementById("add-task");
function set_task_active(data) {
    const current_active_task = data.task_list.find((i) => i.classList.contains("active"));
    current_active_task?.classList.remove("active");
    data.target.classList.add("active");
    console.log(data.target);
}
Event_Signal.subscribe("update_task_ui", set_task_active);
Event_Signal.subscribe("new_current_task", update_config_ui);
add_task_btn?.addEventListener("click", (e) => {
    sidebar.prepend(create_task_component());
});
sidebar?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("task-item")) {
        if (target.classList.contains("active")) {
            return;
        }
        else {
            const task_list = Array.from(sidebar?.querySelectorAll("div.task-item"));
            Event_Signal.publish("update_task_ui", { target, task_list });
            Event_Signal.publish("new_current_task", "ching chong");
        }
    }
});
