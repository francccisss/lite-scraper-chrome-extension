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
 
