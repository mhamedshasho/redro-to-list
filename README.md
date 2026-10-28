# Redro To-Do

<p align="center">
  <a href="https://github.com/mhamedshasho/aleppo-center-cash"><strong>Aleppo Center Cash</strong></a> · Cloud accounting for accounts, payments, and workspaces
</p>

A responsive, red-themed task manager designed for phones and desktop.

## Features
- Add, edit, complete, and delete tasks
- Due dates, priority levels, search, and filters
- Weekly date picker and completion statistics
- IndexedDB persistence on the current device, with localStorage fallback
- JSON export and import for backups
- Light and dark themes
- Installable PWA shell with offline caching
- No account, backend, or external database

## Related project
For shop accounting, customer balances, payments, and shared workspaces, visit [Aleppo Center Cash](https://github.com/mhamedshasho/aleppo-center-cash) or open the [web app](https://aleppo-center-cash.vercel.app/).

## Deploy
This repository deploys automatically to GitHub Pages through `.github/workflows/pages.yml` whenever changes are pushed to `main`. In GitHub, open **Settings → Pages** and ensure **Build and deployment → Source** is set to **GitHub Actions** if it is not already configured.

## Data and privacy
Tasks are stored locally in the browser on the device being used. They are not synced between devices. Export a JSON backup before clearing browser data or switching devices.
