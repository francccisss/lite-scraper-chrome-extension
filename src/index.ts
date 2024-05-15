import Event_Signal from "./utils/pubsub.js";
import {
  add_field_handler,
  remove_field_handler,
  toggle_multipage_input,
  set_current_active_task_config,
  set_task_active,
  get_started_btn_handler,
} from "./input_handlers.js";
import { create_task_component, transition_signed_in } from "./ui.js";
import { create_session_handler } from "./services/server_session.js";
import State_Manager from "./utils/state_manager.js";
import api_routes from "./utils/api_routes.js";
const sidebar = document.getElementById("sidebar");
const add_task_btn = document.getElementById("add-task");
const multipage_toggle_btn = document.getElementById("multipageToggle");
const add_field_btn = document.getElementById("add-field-btn");
const task_schema_container = document.getElementById("task-schema-container");
const get_started_btn = document.getElementById("get-started-btn");

window.addEventListener("load", async () => {
  chrome.cookies.get(
    {
      url: "https://localhost:3005/",
      name: "connect.sid",
    },
    async (cookie) => {
      Event_Signal.publish("load_existing_session", {
        can_sign_in: cookie !== null ? true : false,
      });
    },
  );
});

Event_Signal.subscribe("load_existing_session", transition_signed_in);
Event_Signal.subscribe("create_session", create_session_handler);
Event_Signal.subscribe("create_session", transition_signed_in);
Event_Signal.subscribe("update_task_ui", set_task_active);
Event_Signal.subscribe("new_current_task", set_current_active_task_config);

get_started_btn?.addEventListener("click", get_started_btn_handler);
multipage_toggle_btn?.addEventListener("click", toggle_multipage_input);
add_task_btn?.addEventListener("click", () => {
  (sidebar as HTMLElement).prepend(create_task_component());
});
sidebar?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("task-item")) {
    if (!target.classList.contains("active")) {
      const task_list = Array.from(
        sidebar?.querySelectorAll("div.task-item") as NodeListOf<HTMLElement>,
      );
      Event_Signal.publish("update_task_ui", { target, task_list });
      Event_Signal.publish("new_current_task", "ching chong");
    }
  }
});

add_field_btn?.addEventListener("click", add_field_handler);
task_schema_container?.addEventListener("click", remove_field_handler);
