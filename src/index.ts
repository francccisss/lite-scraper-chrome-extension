import Event_Signal from "./utils/pubsub.js";
import {
  add_field_handler,
  remove_field_handler,
  set_current_active_task_config,
  set_task_active,
  get_started_btn_handler,
  add_task,
  update_task_schema_input,
  update_website_url,
  init_input_buffer,
  save_input_buffer,
  eval_input_buffer,
  change_current_task,
  scrape_request,
} from "./input_handlers.js";
import { transition_signed_in, update_json_display } from "./ui.js";
import {
  create_session_handler,
  start_session,
} from "./services/server_session.js";
const sidebar = document.getElementById("sidebar") as HTMLDivElement;
const add_task_btn = document.getElementById("add-task") as HTMLButtonElement;
const add_field_btn = document.getElementById(
  "add-field-btn",
) as HTMLButtonElement;
const task_schema_container = document.getElementById(
  "task-schema-container",
) as HTMLDivElement;
const get_started_btn = document.getElementById(
  "get-started-btn",
) as HTMLButtonElement;
const form = document.querySelector("form") as HTMLFormElement;

window.addEventListener("load", start_session);

Event_Signal.subscribe("load_existing_session", transition_signed_in);
Event_Signal.subscribe(
  "create_session",
  create_session_handler,
  transition_signed_in,
);
Event_Signal.subscribe(
  "update_sidebar_tasks_ui",
  set_task_active,
  set_current_active_task_config,
);
Event_Signal.subscribe("update_task_schema_input", update_task_schema_input);
Event_Signal.subscribe("update_webURL_input", update_website_url);
Event_Signal.subscribe("update_task_config_ui", update_json_display);

get_started_btn.addEventListener("click", get_started_btn_handler);
add_task_btn.addEventListener("click", add_task);
sidebar.addEventListener("click", change_current_task);
add_field_btn.addEventListener("click", add_field_handler);
task_schema_container.addEventListener("click", remove_field_handler);
form.addEventListener("focusin", init_input_buffer);
form.addEventListener("keyup", save_input_buffer);
form.addEventListener("focusout", eval_input_buffer);
form.addEventListener("submit", scrape_request);
