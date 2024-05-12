import Event_Signal from "./utils/pubsub.js";
import {
  toggle_multipage_input,
  update_config_ui,
} from "./form_input_handlers.js";
import { create_task_component } from "./ui.js";
const sidebar = document.getElementById("sidebar");
const add_task_btn = document.getElementById("add-task");
const multipage_toggle_btn = document.getElementById("multipageToggle");

function set_task_active(data: {
  target: HTMLElement;
  task_list: Array<HTMLElement>;
}) {
  const current_active_task = data.task_list.find((i) =>
    i.classList.contains("active")
  );
  current_active_task?.classList.remove("active");
  data.target.classList.add("active");
  console.log(data.target);
}

Event_Signal.subscribe("update_task_ui", set_task_active);
Event_Signal.subscribe("new_current_task", update_config_ui);

multipage_toggle_btn?.addEventListener("click", toggle_multipage_input);

add_task_btn?.addEventListener("click", (e) => {
  (sidebar as HTMLElement).prepend(create_task_component());
});

sidebar?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("task-item")) {
    if (target.classList.contains("active")) {
      return;
    } else {
      const task_list = Array.from(
        sidebar?.querySelectorAll("div.task-item") as NodeListOf<HTMLElement>
      );
      Event_Signal.publish("update_task_ui", { target, task_list });
      Event_Signal.publish("new_current_task", "ching chong");
    }
  }
});
