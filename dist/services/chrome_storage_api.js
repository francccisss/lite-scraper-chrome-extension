import State_Manager from "../utils/state_manager.js";
export async function set_storage() {
    const tasks = await chrome.storage.local.get("tasks");
    if (tasks === undefined) {
        const create_storage = await chrome.storage.local.set({
            tasks: [],
            scrape_calls: 0,
        });
    }
    const user_storage = await chrome.storage.local.get();
    return user_storage;
}
export async function add_task_local_storage(new_task) {
    const { tasks } = await chrome.storage.local.get("tasks");
    console.log(tasks);
    await chrome.storage.local.set({ tasks: [new_task, ...tasks] });
}
export async function get_current_active_task() {
    try {
        const { tasks } = await chrome.storage.local.get("tasks");
        const state_task_id = State_Manager.get_state("current_active_task");
        const current_active_task = tasks.find((task) => task.taskID === state_task_id);
        if (current_active_task === undefined)
            throw new Error("Task does not exist.");
        return current_active_task;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
export async function update_task_local_storage(updated_data) {
    const current_active_task = State_Manager.get_state("current_active_task");
    if (current_active_task === undefined)
        throw new Error("Task does not exist");
    const { tasks } = await chrome.storage.local.get("tasks");
    const update_tasks = tasks.map((task) => {
        if (task.taskID === current_active_task) {
            console.log({ ...task, ...updated_data });
            return { ...task, ...updated_data };
        }
        return task;
    });
    await chrome.storage.local.set({ tasks: [...update_tasks] });
}
