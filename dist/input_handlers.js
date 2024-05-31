import { add_task_local_storage, get_current_active_task, update_task_local_storage, } from "./services/chrome_storage_api.js";
import { create_input_field, multipage_inputs, populate_task_config, create_task_component, create_popup_message, on_empty_tasks, } from "./ui.js";
import api_routes from "./utils/api_routes.js";
import { find_top_parent } from "./utils/find_top_parent.js";
import { uid } from "./utils/packages/uid/index.mjs";
import Event_Signal from "./utils/pubsub.js";
import State_Manager from "./utils/state_manager.js";
export function change_current_task(e) {
    const target = e.target;
    if (target.classList.contains("task-item")) {
        if (!target.classList.contains("active")) {
            Event_Signal.publish("change_task_ui", target);
        }
    }
}
export async function add_task() {
    const new_task = {
        websiteURL: "",
        taskID: uid(16),
        title: "New Task",
        taskSchema: {
            title: ".placeholder",
            description: ".placeholder-desc",
        },
    };
    await add_task_local_storage(new_task);
    const sidebar = document.getElementById("sidebar");
    const placeholders = { taskID: new_task.taskID, title: new_task.title };
    sidebar.prepend(create_task_component({ ...placeholders }));
}
export function set_task_active(data) {
    const sidebar = document.getElementById("sidebar");
    const task_list = Array.from(sidebar.querySelectorAll("div.task-item"));
    const current_active_task = task_list.find((i) => i.classList.contains("active"));
    current_active_task?.classList.remove("active");
    data.classList.add("active");
    State_Manager.set_state("current_active_task", data.dataset.task);
    on_empty_tasks(false);
}
// triggered when a new task is clicked
export async function set_current_active_task_config() {
    try {
        const current_active_task = await get_current_active_task();
        if (current_active_task === null) {
            console.log("Dont render anything");
            console.error("Task Does not exist.");
            return;
        }
        populate_task_config(current_active_task);
    }
    catch (err) {
        console.error(err);
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
// is_input_field_empty()
// after evaluating the first input if it was empty or not, it does so
// correctly when filling it with texts or when its empty.
// Then after adding another input field, it always
// evaluates to false (input.value is not empty) so it adds another
// input field even though it is empty.
export async function add_field_handler() {
    // look for an input that is an input with a class of key
    // that has no value.
    const is_empty = is_input_field_empty('.task-schema-input > input[class*="key"]:not([value])', 'Please fill up the empty "KEY" input, before adding another field.');
    console.log(is_empty);
    if (is_empty)
        return;
    try {
        const active_task = await get_current_active_task();
        if (active_task === null) {
            throw new Error("Task does not exist");
        }
        await update_task_local_storage({
            ...active_task,
            taskSchema: { ...active_task.taskSchema, "": "" },
        });
        const task_schema_container = document.getElementById("task-schema-container");
        const new_input_field = create_input_field({
            key: "",
            value: "",
        });
        task_schema_container.insertBefore(new_input_field, task_schema_container.children[task_schema_container.children.length - 1]);
        Event_Signal.publish("update_json_ui", {
            ...active_task,
            taskSchema: { ...active_task.taskSchema, "": "" },
        });
    }
    catch (err) {
        console.error(err);
    }
}
export function is_input_field_empty(css_selector, message) {
    const input_field = document.querySelector(css_selector);
    if (input_field === null)
        return false;
    if (input_field.value === "") {
        create_popup_message({
            message: message,
            target: input_field,
        });
        return true;
    }
    else {
        return false;
    }
}
export async function remove_field_handler(e) {
    const target = e.target;
    if (!target.classList.contains("delete-field"))
        return;
    const target_parent = find_top_parent(target, "task-schema-input-container");
    const key_input = target_parent.querySelector("input.key");
    try {
        const active_task = (await get_current_active_task());
        const updated_taskSchema = {
            ...active_task.taskSchema,
        };
        delete updated_taskSchema[key_input.value];
        await update_task_local_storage({
            ...active_task,
            taskSchema: updated_taskSchema,
        });
        target_parent.remove();
        Event_Signal.publish("update_task_config_ui", {
            ...active_task,
            taskSchema: { ...updated_taskSchema },
        });
    }
    catch (err) {
        console.error(err);
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
export async function update_task_schema_input(buffer) {
    const buffer_keys = Object.keys(buffer);
    if (buffer_keys.length < 2)
        return; // if there are no new inputs then do nothing
    const active_task = (await get_current_active_task());
    let updated_task_schema = {};
    for (let [key, value] of Object.entries(active_task.taskSchema)) {
        switch (buffer_keys[1]) {
            case "key": {
                if (buffer.old !== key) {
                    updated_task_schema = {
                        ...updated_task_schema,
                        [key]: value,
                    };
                    break;
                }
                console.log("replace key");
                updated_task_schema = {
                    ...updated_task_schema,
                    [buffer.key]: value,
                };
                break;
            }
            case "value": {
                if (buffer.old !== value) {
                    updated_task_schema = {
                        ...updated_task_schema,
                        [key]: value,
                    };
                    break;
                }
                console.log("replace value");
                updated_task_schema = {
                    ...updated_task_schema,
                    [key]: buffer.value,
                };
                break;
            }
        }
    }
    try {
        await update_task_local_storage({
            ...active_task,
            taskSchema: updated_task_schema,
        });
        Event_Signal.publish("update_json_ui", {
            ...active_task,
            taskSchema: updated_task_schema,
        });
    }
    catch (err) {
        console.error(err);
    }
}
export async function update_website_url(buffer) {
    const buffer_keys = Object.keys(buffer);
    if (buffer_keys.length < 2)
        return; // if there are no new inputs then do nothing
    const active_task = (await get_current_active_task());
    try {
        const update_task = {
            ...active_task,
            websiteURL: buffer.websiteURL,
        };
        await update_task_local_storage(update_task);
        Event_Signal.publish("update_json_ui", update_task);
    }
    catch (err) {
        console.error(err);
    }
}
export async function update_task_title(buffer) {
    console.log("update task title");
    const buffer_keys = Object.keys(buffer);
    if (buffer_keys.length < 2)
        return; // if there are no new inputs then do nothing
    const active_task = (await get_current_active_task());
    try {
        const update_task = {
            ...active_task,
            title: buffer["title-input"],
        };
        await update_task_local_storage(update_task);
        Event_Signal.publish("update_json_ui", update_task);
        Event_Signal.publish("update_active_task_sidebar", update_task);
    }
    catch (err) {
        console.error(err);
    }
}
export function init_input_buffer(e) {
    const target = e.target;
    if (target.tagName.toLowerCase() === "input") {
        State_Manager.set_state("input_buffer", {
            old: target.value,
        });
    }
}
export function save_input_buffer(e) {
    const target = e.target;
    if (target.tagName.toLowerCase() === "input") {
        const input_buffer = State_Manager.get_state("input_buffer"); // Think of a way to only call this once.
        State_Manager.set_state("input_buffer", {
            ...input_buffer,
            [target.classList[0]]: target.value,
        });
    }
}
export function eval_input_buffer(e) {
    const target = e.target;
    const input_buffer = State_Manager.get_state("input_buffer");
    console.log(input_buffer);
    if (target.classList.contains("key") || target.classList.contains("value")) {
        Event_Signal.publish("update_task_schema_input", input_buffer);
    }
    else if (target.id === "websiteURL") {
        Event_Signal.publish("update_webURL_input", input_buffer);
    }
    else if (target.id === "title-input") {
        Event_Signal.publish("update_title_input", input_buffer);
    }
    target.blur();
}
export async function scrape_request(e) {
    e.preventDefault();
    const is_empty = is_input_field_empty('.task-schema-input > input[class*="key"]:not([value])', 'Please fill up the empty "KEY" input, before adding another field.');
    if (is_empty)
        return;
    const active_task = await get_current_active_task();
    if (active_task === null)
        return;
    const post = await fetch(api_routes.post, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(active_task),
    });
    const resp = await post.json();
    console.log(resp);
}
export function delete_task(target) {
    const sidebar = document.getElementById("sidebar");
    const tasks_ui = Array.from(sidebar.children);
    const task_items_length = tasks_ui.length - 1;
    let current_active_task;
    let task_ui_index;
    if (tasks_ui.length < 3) {
        // taking into account the add task button
        current_active_task = tasks_ui[0];
        Event_Signal.publish("delete_task", {
            task_index: 0,
            task_element: current_active_task,
        });
        current_active_task.remove();
        on_empty_tasks(true);
    }
    else if (tasks_ui.length > 2) {
        // taking into account the add task button
        let new_active_task;
        current_active_task = tasks_ui.find((task) => task.classList.contains("active"));
        task_ui_index = tasks_ui.findIndex((task) => task.classList.contains("active"));
        Event_Signal.publish("delete_task", {
            task_index: task_ui_index,
            task_element: current_active_task,
        });
        if (task_ui_index === task_items_length - 1) {
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
