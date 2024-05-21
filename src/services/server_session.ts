import { init_tasks_ui } from "../ui.js";
import Event_Signal from "../utils/pubsub.js";
import State_Manager from "../utils/state_manager.js";
import { set_storage } from "./chrome_storage_api.js";

export function create_session_handler(data: any) {
  const get_started_btn = document.getElementById(
    "get-started-btn",
  ) as HTMLElement;
  if (data.can_sign_in) {
    State_Manager.set_state("current_session", data);
    console.log(State_Manager.get_state("current_session"));
    return;
  }
  get_started_btn.setAttribute("disabled", "true");
}

export async function start_session() {
  chrome.cookies.get(
    {
      url: "https://localhost:3005/",
      name: "connect.sid",
    },
    async (cookie) => {
      const eval_cookie = cookie !== null ? true : false;
      Event_Signal.publish("load_existing_session", {
        can_sign_in: eval_cookie,
      });
    },
  );

  try {
    const user_storage = await set_storage();
    console.log(user_storage.tasks);
    init_tasks_ui(user_storage.tasks);
  } catch (err) {
    console.error(err);
  }
}
