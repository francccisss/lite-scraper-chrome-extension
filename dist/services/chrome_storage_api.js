export async function init_session() {
    console.log(chrome);
    // const set_current_user_session = await chrome.storage.local.set({
    //   tasks: [],
    //   sess_id: "12321",
    // });
    const get_current_user_session = await chrome.storage.local.get(["tasks"]);
    await chrome.storage.local.clear();
    console.log(get_current_user_session);
}
