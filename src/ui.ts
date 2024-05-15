import uid from "./utils/packages/dist/index.js";
import { multipageConfig } from "./utils/task_config.js";

export function create_task_component(): HTMLElement {
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

export function multipage_inputs(): {
  create: () => void;
  destroy: () => void;
  input_container: HTMLElement;
} {
  const multipage_container = document.querySelector("#multipage-container");
  let multipage_input_container = document.getElementById(
    "multipage-input-container",
  ) as HTMLElement;

  const create = () => {
    multipage_input_container = document.createElement("div");
    multipage_input_container.setAttribute("id", "multipage-input-container");
    const multipage_keys = Object.keys(multipageConfig);
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

// i give up
export function create_input_field() {
  const parser = new DOMParser();
  const input_field_string = `
  <div class="task-schema-input-container" >
      <span class="task-schema-input key-value-input">
        <input id="key" name="" placeholder="key" type="text">
        <input id="value" name="" placeholder="value" type="text">
      </span>
      <span>
        <button type="button" class="target-btn"></button>
        <button type="button" class="delete-field"></button>
      </span>
   </div>`;
  const parsed_input_field = parser.parseFromString(
    input_field_string,
    "text/html",
  );
  return parsed_input_field;
}

export function transition_signed_in(data: any) {
  const welcome_page = document.getElementById("welcome-box") as HTMLElement;
  const task_list_container = document.getElementById(
    "task-list-container",
  ) as HTMLElement;
  if (data.can_sign_in) {
    welcome_page.style.display = "none";
    task_list_container.style.display = "flex";
  }
}
