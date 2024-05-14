const url = "https://localhost:3005";
const scraper_api = "api/v1/scraper";
export default {
    index: `${url}/`,
    post: `${url}$/{scraper_api}/scrape`,
    download: `${url}/${scraper_api}/download`,
};
