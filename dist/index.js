import Event_Signal from "./utils/pubsub.js";
import { add_field_handler, remove_field_handler, toggle_multipage_input, update_config_ui, set_task_active, } from "./input_handlers.js";
import { create_task_component } from "./ui.js";
import api_routes from "./utils/api_routes.js";
import State_Manager from "./utils/state_manager.js";
const sidebar = document.getElementById("sidebar");
const add_task_btn = document.getElementById("add-task");
const multipage_toggle_btn = document.getElementById("multipageToggle");
const add_field_btn = document.getElementById("add-field-btn");
const task_schema_container = document.getElementById("task-schema-container");
const get_started_btn = document.getElementById("get-started-btn");
get_started_btn?.addEventListener("click", async () => {
    try {
        Event_Signal.publish("init_session", false);
        const create_session = await fetch(`${api_routes.index}`, {
            credentials: "include",
        });
        const parse_response = await create_session.json();
        Event_Signal.publish("init_session", true);
        Event_Signal.publish("signed_in", parse_response);
        Event_Signal.unsubscribe("init_session");
    }
    catch (er) {
        console.error("Unable to create a new session");
        console.log(er);
    }
});
Event_Signal.subscribe("init_session", (data) => {
    console.log({ fetching_status: data });
});
Event_Signal.subscribe("signed_in", (data) => {
    State_Manager.set_state("current_session", data);
    console.log(State_Manager.get_state());
});
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
