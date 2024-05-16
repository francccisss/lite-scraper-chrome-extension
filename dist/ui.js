import { set_current_active_task_config, set_task_active, } from "./input_handlers.js";
import uid from "./utils/packages/dist/index.js";
function remove_task_input_fields() {
    const task_schema_input_containers = document.querySelectorAll(".task-schema-input-container");
    console.log(task_schema_input_containers);
    task_schema_input_containers.forEach((input) => input.remove());
}
export function populate_task_config({ websiteURL, isMultipage, taskSchema, }) {
    const form = document.querySelector("form");
    const websiteURL_input = form.querySelector("#websiteURL");
    const task_schema_container = document.getElementById("task-schema-container");
    const multipage_toggle = document.querySelector(`input#multipageToggle`);
    websiteURL_input.value = websiteURL;
    multipage_toggle.checked = isMultipage;
    remove_task_input_fields();
    for (const [key, value] of Object.entries(taskSchema)) {
        task_schema_container?.insertBefore(create_input_field({ key, value }), task_schema_container.children[1]);
    }
}
export function create_task_component({ taskID, title, }) {
    const task_container = document.createElement("div");
    const task_icon = document.createElement("span");
    const task_title = document.createElement("p");
    task_container.setAttribute("class", "task-item item");
    task_container.dataset.task = taskID;
    task_title.textContent = title;
    task_container.append(task_icon);
    task_container.append(task_title);
    return task_container;
}
export function add_task() {
    const sidebar = document.getElementById("sidebar");
    const placeholders = { taskID: uid(16), title: "New Task" };
    sidebar.prepend(create_task_component({ ...placeholders }));
}
export async function init_tasks_ui(tasks) {
    try {
        const sidebar = document.getElementById("sidebar");
        if (tasks === undefined)
            throw new Error("Unable to setup storage.");
        if (tasks.length === 0)
            return; // try to render something
        tasks.forEach((task) => {
            sidebar.prepend(create_task_component({ taskID: task.taskID, title: task.title }));
        });
        set_task_active(sidebar.children[0]);
        set_current_active_task_config();
    }
    catch (err) {
        console.log(err);
    }
}
export function multipage_inputs() {
    const multipage_container = document.querySelector("#multipage-container");
    let multipage_input_container = document.getElementById("multipage-input-container");
    const create = () => {
        multipage_input_container = document.createElement("div");
        multipage_input_container.setAttribute("id", "multipage-input-container");
        const multipage_keys = Object.keys({
            starting_page: "",
            end_page: "",
            next_element: "",
        });
        ["Starting Page", "End Page", "Next Element"].forEach((key, i) => {
            const config_input = document.createElement("span");
            const key_input = document.createElement("input");
            const value_input = document.createElement("input");
            key_input.value = key;
            key_input.readOnly = true;
            key_input.disabled;
            key_input.style.outline = "none";
            key_input.style.cursor = "default";
            value_input.setAttribute("type", "text");
            config_input.classList.add("key-value-input");
            key_input.setAttribute("id", `${multipage_keys[i]}-key`);
            value_input.setAttribute("id", `${multipage_keys[i]}-value`);
            config_input.append(key_input);
            config_input.append(value_input);
            multipage_input_container.append(config_input);
        });
        multipage_container?.append(multipage_input_container);
    };
    const destroy = () => {
        multipage_input_container.remove();
    };
    return { create, destroy, input_container: multipage_input_container };
}
export function create_input_field({ key, value, }) {
    const parser = new DOMParser();
    const input_field_string = `
  <div class="task-schema-input-container" >
      <span class="task-schema-input key-value-input">
        <input id="key" value=${key} name=${key} placeholder="key" type="text">
        <input id="value" value=${value} name=${value} placeholder="value" type="text">
      </span>
      <span>
        <button type="button" class="target-btn"></button>
        <button type="button" class="delete-field"></button>
      </span>
   </div>`;
    const parsed_input_field = parser.parseFromString(input_field_string, "text/html");
    return parsed_input_field.querySelector(".task-schema-input-container");
}
export function transition_signed_in(data) {
    const welcome_page = document.getElementById("welcome-box");
    const task_list_container = document.getElementById("task-list-container");
    if (data.can_sign_in) {
        welcome_page.style.display = "none";
        task_list_container.style.display = "flex";
    }
}
