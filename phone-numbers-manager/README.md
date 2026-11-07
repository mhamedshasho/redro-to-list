# Redro Phone Numbers Manager

A simple private, offline-first phone directory. Each entry contains a person's name, printing shop name, and phone number. Choose a saved contact using the supported phone contact picker or enter the details manually.

## Redro To-Do integration

This app shares the `RedroTodoDB` IndexedDB database with Redro To-Do. Contacts are stored in the `contacts` object store and follow-up tasks are written to the existing `tasks` store. Tasks include contact metadata and appear in Redro To-Do. Completion changes are reflected here when the To-Do app broadcasts task updates.

Both apps must be opened under the same origin (the GitHub Pages address for this repository). Data remains on the current browser/device; it is not cloud-synced. Use the JSON contact backup when changing devices.

## Features

- Arabic and English interface
- Search by person name, printing shop, or phone number
- Optional phone contact picker with manual entry fallback
- Direct `tel:` calling
- Create follow-up tasks for a contact
- Shared tasks with Redro To-Do
- Local IndexedDB storage and offline PWA support
- JSON export and import

## Deployment

The app is available in the `phone-numbers-manager/` folder of the Redro To-Do repository and uses the same GitHub Pages origin so IndexedDB can be shared.
