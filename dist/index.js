import Event_Signal from "./utils/pubsub.js";
import { add_field_handler, remove_field_handler, toggle_multipage_input, update_config_ui, } from "./form_input_handlers.js";
import { create_task_component } from "./ui.js";
import { init_session } from "./services/chrome_storage_api.js";
const sidebar = document.getElementById("sidebar");
const add_task_btn = document.getElementById("add-task");
const multipage_toggle_btn = document.getElementById("multipageToggle");
const add_field_btn = document.getElementById("add-field-btn");
const task_schema_container = document.getElementById("task-schema-container");
// ***** TODO ********
// When deleting a task schema input field
// it sends a notification about thhat input field
// mainly the key that is stored within it, this notification
//
// Updating the input fields Data:
//  sends a signal to update the current task in the chrome's local storage
//  also sends another signal to update the input fields,
//
// Updating the input fields UI:
//  removes all of the input fields and reads the keys that exist on the database
//  for the current task, and iterates through each to create the updated input field UI.
// ***** TODO ********
window.addEventListener("load", () => {
    init_session();
});
function set_task_active(data) {
    const current_active_task = data.task_list.find((i) => i.classList.contains("active"));
    current_active_task?.classList.remove("active");
    data.target.classList.add("active");
    console.log(data.target);
}
Event_Signal.subscribe("update_task_ui", set_task_active);
Event_Signal.subscribe("new_current_task", update_config_ui);
multipage_toggle_btn?.addEventListener("click", toggle_multipage_input);
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
add_field_btn?.addEventListener("click", add_field_handler);
task_schema_container?.addEventListener("click", remove_field_handler);
