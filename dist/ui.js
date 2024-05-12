import uid from "./utils/packages/dist/index.js";
import { multipageConfig } from "./utils/task_config.js";
export function create_task_component() {
    const task_container = document.createElement("div");
    const task_icon = document.createElement("span");
    const task_title = document.createElement("p");
    task_container.setAttribute("class", "task-item item");
    task_container.dataset.taskID = uid(16);
    task_title.textContent = "ROOMMATES";
    task_container.append(task_icon);
    task_container.append(task_title);
    return task_container;
}
export function multipage_inputs(parent) {
    const multipage_input_container = document.createElement("div");
    multipage_input_container.setAttribute("id", "multipage-input-container");
    function create() {
        const multipage_keys = Object.keys(multipageConfig);
        ["Starting Page", "End Page", "Next Element"].forEach((key, i) => {
            const config_input = document.createElement("span");
            const key_input = document.createElement("input");
            const value_input = document.createElement("input");
            key_input.value = key;
            key_input.disabled;
            config_input.classList.add("key-value-input");
            key_input.setAttribute("id", `${multipage_keys[i]}-key`);
            value_input.setAttribute("id", `${multipage_keys[i]}-value`);
            config_input.append(key_input);
            config_input.append(value_input);
            multipage_input_container.append(config_input);
        });
        parent.append(multipage_input_container);
    }
    function destroy() {
        parent.removeChild(multipage_input_container);
    }
    return {
        create,
        destroy,
    };
}
