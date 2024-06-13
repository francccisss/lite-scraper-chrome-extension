# web-scraping-service-chrome-extension
A Front-end chrome extension for consuming the web scraping service API. This is a minimal user-friendly web scraping service for gathering insights for businesses and a tool for all kinds of developers.

### How it works
You can create multiple **tasks** for scraping different websites and create multiple inputs that correspond to an element in the DOM using the element's css selector and use that to extract the data you need from that element.


### How data is stored and how your session is handled
Your tasks are stored in the chrome extension's local storage, but the data you scraped will be stored in our database with an expiration.  
Every user session has a limit of of 24 hours and a scrape limit of **100 scrapes**, once a user exceeds the limit they will be placed in a timeout and will reset in 24 hours.

**Tips**
- Make sure the url you specified is a complete link to the website
example : "https://www.amazon.com/" or "https://global.microless.com/" and not "global.microless.com"

Preview:

![lite-scraper1](https://github.com/Sty6x/lite-scraper-chrome-extension/assets/53662191/34d66baa-fcdb-4a39-a46c-e491fa97defa)
![lite-scraper2](https://github.com/Sty6x/lite-scraper-chrome-extension/assets/53662191/465765dc-ecb0-4402-8759-b29507585b76)
![sc2](https://github.com/Sty6x/lite-scraper-chrome-extension/assets/53662191/31ce09ae-d9b5-4408-b1a3-0f026ebf17da)



