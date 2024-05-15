import { create_input_field, multipage_inputs } from "./ui.js";
import api_routes from "./utils/api_routes.js";
import { find_top_parent } from "./utils/find_top_parent.js";
import Event_Signal from "./utils/pubsub.js";
import State_Manager from "./utils/state_manager.js";
export function set_task_active(data) {
    const sidebar = document.getElementById("sidebar");
    const task_list = Array.from(sidebar?.querySelectorAll("div.task-item"));
    const current_active_task = task_list.find((i) => i.classList.contains("active"));
    current_active_task?.classList.remove("active");
    data.classList.add("active");
    State_Manager.set_state("current_active_task", data.dataset.task);
    console.log(State_Manager.get_state());
}
// triggered when a new task is clicked
export function set_current_active_task_config(data) {
    console.log(data);
    const form = document.querySelector("form");
    const websiteURL_input = form?.querySelector("#websiteURL");
    const multipage_toggle = form?.querySelector(`input#multipageToggle`);
    const task_schema_inputs = Array.from(form?.querySelectorAll(".task-schema-input"));
    console.log({
        webURL: websiteURL_input,
        multipage_toggle: multipage_toggle.checked,
        task_schema_inputs: task_schema_inputs.map((inputs_container) => inputs_container.children),
    });
    const multipage_input_initializer = multipage_inputs();
    if (multipage_toggle.checked &&
        multipage_input_initializer.input_container !== null) {
        return;
    }
    else if (multipage_toggle.checked &&
        multipage_input_initializer.input_container === null) {
        multipage_input_initializer.create();
    }
    else if (!multipage_toggle.checked &&
        multipage_input_initializer.input_container !== null) {
        multipage_input_initializer.destroy();
    }
}
export function toggle_multipage_input(e) {
    const target = e.target;
    const inputs = multipage_inputs();
    if (target.checked) {
        inputs.create();
        return;
    }
    inputs.destroy();
}
export function add_field_handler(e) {
    const task_schema_container = document.getElementById("task-schema-container");
    const new_input_field = create_input_field().querySelector(".task-schema-input-container");
    console.log(new_input_field);
    task_schema_container?.insertBefore(new_input_field, task_schema_container.children[1]);
}
export function remove_field_handler(e) {
    const target = e.target;
    if (target.classList.contains("delete-field")) {
        const target_parent = find_top_parent(target, "task-schema-input-container");
        target_parent?.remove();
    }
}
export async function get_started_btn_handler() {
    try {
        Event_Signal.publish("create_session", { can_sign_in: false });
        const create_session = await fetch(`${api_routes.index}`, {
            credentials: "include",
        });
        const parse_response = await create_session.json();
        Event_Signal.publish("create_session", parse_response);
        Event_Signal.unsubscribe("create_session");
    }
    catch (er) {
        Event_Signal.publish("create_session", { can_sign_in: false });
        console.error("Unable to create a new session");
        console.log(er);
    }
}
