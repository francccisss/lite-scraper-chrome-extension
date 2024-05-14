export async function init_session() {
    const get_current_user_session = await chrome.storage.local.get();
    if (Object.keys(get_current_user_session).length === 0) {
        const set_current_user_session = await chrome.storage.local.set({
            tasks: [],
        });
        return "Session Created";
    }
    return "Session Exists";
}
