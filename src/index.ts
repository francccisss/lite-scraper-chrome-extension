import Event_Signal from "./utils/pubsub.js";
import uid from "./utils/uid/dist/index.js";
const sidebar = document.getElementById("sidebar");
const add_task_btn = document.getElementById("add-task");

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

function create_task_component(): HTMLElement {
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

Event_Signal.subscribe("update_task_ui", set_task_active);

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
    }
  }
});
