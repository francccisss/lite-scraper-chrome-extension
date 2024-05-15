import State_Manager from "../utils/state_manager.js";

export function create_session_handler(data: any) {
  const get_started_btn = document.getElementById("get-started-btn");
  if (get_started_btn !== null) {
    if (data.can_sign_in) {
      State_Manager.set_state("current_session", data);
      console.log(State_Manager.get_state("current_session"));
      return;
    }
    get_started_btn.setAttribute("disabled", "true");
  }
}
