import { uid } from "../utils/packages/dist/index.mjs";
import State_Manager from "../utils/state_manager.js";
import { t_task } from "../utils/types/project_types";

export async function set_storage(): Promise<{ [key: string]: any }> {
  await chrome.storage.local.set({
    tasks: [
      {
        title: "Amazon Phones",
        taskID: uid(16),
        websiteURL:
          "https://www.amazon.ae/Mobile-Phones/b?ie=UTF8&node=15415001031",
        isMultipage: false,
        taskSchema: {
          item: ".item-name",
          itemDescription: ".item-desc",
          discount: ".item-discount",
          price: ".item-price",
          currency: ".item-price-currency",
        },
      },

      {
        title: "Epoch Converter",
        taskID: uid(16),
        websiteURL: "https://www.epochconverter.com/",
        isMultipage: true,

        taskSchema: {
          title: ".title",
          description: ".desc",
          dateCreated: "june 1",
        },
      },

      {
        title: "Haru",
        taskID: uid(16),
        websiteURL: "https://www.youtube.com/watch?v=Ki6_VnABBBQ",
        isMultipage: false,
        taskSchema: {
          youtubeTitle: ".yt-title",
          description: ".desc",
          subs: "#yt-subs",
        },
      },
    ],
    scrape_calls: 0,
  });
  const user_storage = await chrome.storage.local.get();
  return user_storage;
}

export async function add_task_local_storage(new_task: t_task) {
  const { tasks } = await chrome.storage.local.get("tasks");
  console.log(tasks);
  await chrome.storage.local.set({ tasks: [new_task, ...tasks] });
}

export async function get_current_active_task(): Promise<t_task | null> {
  try {
    const { tasks } = await chrome.storage.local.get("tasks");
    const state_task_id = State_Manager.get_state("current_active_task");
    const current_active_task = (tasks as Array<t_task>).find(
      (task: t_task) => task.taskID === state_task_id,
    );
    if (current_active_task === undefined)
      throw new Error("Task does not exist.");
    return current_active_task;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function update_task_local_storage(updated_data: t_task) {
  const current_active_task = State_Manager.get_state("current_active_task");
  if (current_active_task === undefined) throw new Error("Task does not exist");
  const { tasks } = await chrome.storage.local.get("tasks");
  const update_tasks = (tasks as Array<t_task>).map((task) => {
    if (task.taskID === current_active_task) {
      console.log({ ...task, ...updated_data });
      return { ...task, ...updated_data };
    }
    return task;
  });
  await chrome.storage.local.set({ tasks: [...update_tasks] });
}
