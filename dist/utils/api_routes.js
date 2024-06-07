const url = "https://lite-scraper-api.onrender.com";
const scraper_api = "api/v1/scraper";
export default {
    index: `${url}/`,
    post: `${url}/${scraper_api}/scrape`,
    download: `${url}/${scraper_api}/download`,
};
