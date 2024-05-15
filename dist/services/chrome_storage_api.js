// user flow after successfully creating a session or sign-in
// check if a storage already exists
// if so publish an event that populates all of the task on the sidebar
import { uid } from "../utils/packages/dist/index.mjs";
export async function set_storage() {
    const user_storage = await chrome.storage.local.get();
    if (Object.keys(user_storage).length === 0) {
        await chrome.storage.local.set({
            tasks: [
                {
                    title: "Amazon Phones",
                    taskID: uid(16),
                    websiteURL: "https://www.amazon.ae/Mobile-Phones/b?ie=UTF8&node=15415001031",
                    isMultipage: false,
                    taskSchema: {},
                },
                {
                    title: "Epoch Converter",
                    taskID: uid(16),
                    websiteURL: "https://www.epochconverter.com/",
                    isMultipage: true,
                    taskSchema: {},
                },
                {
                    title: "Haru",
                    taskID: uid(16),
                    websiteURL: "https://www.youtube.com/watch?v=Ki6_VnABBBQ",
                    isMultipage: false,
                    taskSchema: {},
                },
            ],
            scrape_calls: 0,
        });
        return user_storage;
    }
    return user_storage;
}
