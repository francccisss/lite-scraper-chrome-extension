import { create_input_field, multipage_inputs } from "./ui.js";
// triggered when a new task is clicked
export function update_config_ui(data) {
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
    if (!multipage_toggle.checked) {
        multipage_input_initializer.destroy();
        return;
    }
    multipage_input_initializer.create();
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
    const target = e.currentTarget;
    const new_input_field = create_input_field().querySelector(".task-schema-input-container");
    console.log(new_input_field);
    task_schema_container?.insertBefore(new_input_field, task_schema_container.children[1]);
}
