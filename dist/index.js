import Event_Signal from "./utils/pubsub.js";
import { add_field_handler, remove_field_handler, set_current_active_task_config, set_task_active, get_started_btn_handler, add_task, update_task_schema_input, update_website_url, init_input_buffer, save_input_buffer, eval_input_buffer, change_current_task, scrape_request, } from "./input_handlers.js";
import { on_empty_tasks, transition_signed_in, update_json_display, } from "./ui.js";
import { create_session_handler, start_session, } from "./services/server_session.js";
const sidebar = document.getElementById("sidebar");
const add_task_btn = document.getElementById("add-task");
const add_field_btn = document.getElementById("add-field-btn");
const task_schema_container = document.getElementById("task-schema-container");
const get_started_btn = document.getElementById("get-started-btn");
const form = document.querySelector("form");
const task_btns_container = document.getElementById("title-edit-delete-btn-container");
window.addEventListener("load", start_session);
Event_Signal.subscribe("load_existing_session", transition_signed_in);
Event_Signal.subscribe("create_session", create_session_handler, transition_signed_in);
Event_Signal.subscribe("change_task_ui", set_task_active, set_current_active_task_config);
Event_Signal.subscribe("update_task_schema_input", update_task_schema_input);
Event_Signal.subscribe("update_webURL_input", update_website_url);
Event_Signal.subscribe("update_json_ui", update_json_display);
task_btns_container.addEventListener("click", (e) => {
    const target = e.target;
    if (target.id === "delete-task") {
        const tasks_ui = Array.from(sidebar.children);
        const task_items_length = tasks_ui.length - 1;
        let current_active_task;
        let task_ui_index;
        if (tasks_ui.length < 3) {
            // taking into account the add task button
            current_active_task = tasks_ui[0];
            current_active_task.remove();
            console.log("empty");
            // do something once the ui is empty
            on_empty_tasks(true);
        }
        else if (tasks_ui.length > 2) {
            // taking into account the add task button
            let new_active_task;
            current_active_task = tasks_ui.find((task) => task.classList.contains("active"));
            task_ui_index = tasks_ui.findIndex((task) => task.classList.contains("active"));
            if (task_ui_index === task_items_length - 1) {
                console.log("last index");
                new_active_task = tasks_ui[task_ui_index - 1];
                Event_Signal.publish("change_task_ui", new_active_task);
            }
            else if (task_ui_index < tasks_ui.length - 1) {
                new_active_task = tasks_ui[task_ui_index + 1];
                Event_Signal.publish("change_task_ui", new_active_task);
            }
            current_active_task.remove();
        }
        else {
            return;
        }
    }
});
get_started_btn.addEventListener("click", get_started_btn_handler);
add_task_btn.addEventListener("click", add_task);
sidebar.addEventListener("click", change_current_task);
add_field_btn.addEventListener("click", add_field_handler);
task_schema_container.addEventListener("click", remove_field_handler);
form.addEventListener("focusin", init_input_buffer);
form.addEventListener("keyup", save_input_buffer);
form.addEventListener("focusout", eval_input_buffer);
form.addEventListener("submit", scrape_request);
