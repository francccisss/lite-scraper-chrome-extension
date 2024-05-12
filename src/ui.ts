import uid from "./utils/packages/dist/index.js";

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
