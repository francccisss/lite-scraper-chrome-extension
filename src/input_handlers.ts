import {
  add_task_local_storage,
  get_current_active_task,
  update_task_local_storage,
} from "./services/chrome_storage_api.js";
import {
  create_input_field,
  multipage_inputs,
  populate_task_config,
  create_task_component,
  is_input_field_empty,
} from "./ui.js";
import api_routes from "./utils/api_routes.js";
import { find_top_parent } from "./utils/find_top_parent.js";
import { uid } from "./utils/packages/dist/index.mjs";
import Event_Signal from "./utils/pubsub.js";
import State_Manager from "./utils/state_manager.js";
import { t_task } from "./utils/types/project_types";

export async function add_task() {
  const new_task: t_task = {
    websiteURL: "",
    taskID: uid(16),
    title: "New Task",
    isMultipage: false,
    taskSchema: {
      title: ".placeholder",
      description: ".placeholder-desc",
    },
  };
  await add_task_local_storage(new_task);
  const sidebar = document.getElementById("sidebar") as HTMLElement;
  const placeholders = { taskID: new_task.taskID, title: new_task.title };
  sidebar.prepend(create_task_component({ ...placeholders }));
}

export function set_task_active(data: HTMLElement) {
  const sidebar = document.getElementById("sidebar");
  const task_list = Array.from(
    sidebar?.querySelectorAll("div.task-item") as NodeListOf<HTMLElement>,
  );
  const current_active_task = task_list.find((i) =>
    i.classList.contains("active"),
  );
  current_active_task?.classList.remove("active");
  data.classList.add("active");
  State_Manager.set_state("current_active_task", data.dataset.task);
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
    if (
      current_active_task.isMultipage &&
      multipage_inputs().input_container !== null
    ) {
      return;
    } else if (
      current_active_task.isMultipage &&
      multipage_inputs().input_container === null
    ) {
      multipage_inputs().create();
    } else if (
      !current_active_task.isMultipage &&
      multipage_inputs().input_container !== null
    ) {
      multipage_inputs().destroy();
    }
  } catch (err) {
    console.error(err);
  }
}

export function toggle_multipage_input(e: Event) {
  const target = e.target as HTMLInputElement;
  const inputs = multipage_inputs();
  if (target.checked) {
    inputs.create();
    return;
  }
  inputs.destroy();
}

export async function add_field_handler() {
  try {
    if (is_input_field_empty() === true) return;
    const active_task = await get_current_active_task();
    if (active_task === null) {
      throw new Error("Task does not exist");
    }
    await update_task_local_storage({
      ...active_task,
      taskSchema: { ...active_task.taskSchema, "": "" },
    });
    const task_schema_container = document.getElementById(
      "task-schema-container",
    ) as HTMLElement;
    const new_input_field = create_input_field({
      key: "",
      value: "",
    });

    task_schema_container.insertBefore(
      new_input_field as Element,
      task_schema_container.children[1],
    );
  } catch (err) {
    console.error(err);
  }
}

export async function remove_field_handler(e: Event) {
  const target = e.target as HTMLElement;
  if (!target.classList.contains("delete-field")) return;
  const target_parent = find_top_parent(
    target,
    "task-schema-input-container",
  ) as HTMLElement;
  const key_input = target_parent.querySelector(
    "input#key",
  ) as HTMLInputElement;
  try {
    const current_active_task = (await get_current_active_task()) as t_task;
    const updated_taskSchema = {
      ...current_active_task.taskSchema,
    };
    delete updated_taskSchema[key_input.value];
    await update_task_local_storage({
      ...current_active_task,
      taskSchema: updated_taskSchema,
    });
    target_parent.remove();
  } catch (err) {
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
  } catch (er) {
    Event_Signal.publish("create_session", { can_sign_in: false });
    console.error("Unable to create a new session");
    console.log(er);
  }
}
