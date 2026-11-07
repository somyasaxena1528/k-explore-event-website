# K Explore — Event Management Website

A responsive event discovery and registration website built with **HTML5, CSS3 and vanilla JavaScript**, based on the K Explore Web Designing task brief.

## Student details
- **Name:** Somya Saxena
- **Roll number:** 2405688

## Features
- Responsive landing page for mobile, tablet and desktop
- Event cards with image, category, date, venue and description
- Search events by title, category, venue or description
- Category filters: Music, Technology, Art and Wellness
- Event details modal with date, time and venue
- Registration form with JavaScript validation for name, email and 10-digit phone number
- Registration confirmation message
- Registrations saved in browser Local Storage (`kExploreRegistrations`)
- Mobile navigation menu and subtle hover/entrance interactions

## Project files
- `index.html` — page structure and modals
- `style.css` — layout, responsive styling and visual design
- `script.js` — event data, search, filters, modal interactions, validation and Local Storage

## Run locally
1. Download or clone this repository.
2. Keep all three project files in the same folder.
3. Open `index.html` in a browser.

No build step or package installation is required.

## Customize events
Open `script.js` and edit the `events` array. Each event has:
`id`, `title`, `category`, `date`, `time`, `venue`, `description`, and `image`.

## View saved registrations
Open the browser developer tools → Application/Storage → Local Storage → your website origin → `kExploreRegistrations`.
This is a front-end demonstration. Local Storage is specific to the browser/device and is not a secure central database.

## Deploy
- **GitHub Pages:** push the files to a GitHub repository, then enable Pages in repository Settings → Pages.
- **Netlify:** drag the project folder into Netlify Drop or connect the GitHub repository.
- **Vercel:** import the GitHub repository; use the project root with no build command.

## Git basics
```bash
git init
git add .
git commit -m "Build K Explore event management website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/k-explore.git
git push -u origin main
```

## Notes
- Event names, dates, venues and descriptions are sample content for demonstration; update them to match your actual event data.
- Event photos are loaded from Unsplash, and Google Fonts are loaded online, so those assets need an internet connection.
- Registration data is stored only in Local Storage. A real production registration system would need a backend and database.
