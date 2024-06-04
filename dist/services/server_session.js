import { init_tasks_ui } from "../ui.js";
import api_routes from "../utils/api_routes.js";
import Event_Signal from "../utils/pubsub.js";
import State_Manager from "../utils/state_manager.js";
import { set_storage } from "./chrome_storage_api.js";
export function create_session_handler(data) {
    const get_started_btn = document.getElementById("get-started-btn");
    if (data.can_sign_in) {
        State_Manager.set_state("current_session", data);
        return;
    }
    get_started_btn.setAttribute("disabled", "true");
}
export async function start_session() {
    chrome.cookies.get({
        url: api_routes.index,
        name: "connect.sid",
    }, async (cookie) => {
        const eval_cookie = cookie !== null ? true : false;
        Event_Signal.publish("load_existing_session", {
            can_sign_in: eval_cookie,
        });
    });
    try {
        const user_storage = await set_storage();
        init_tasks_ui(user_storage.tasks);
    }
    catch (err) {
        console.error(err);
    }
}
