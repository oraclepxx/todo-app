# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chrome Extension (Manifest V3) — a todo list app ("My Tasks") that runs as a browser popup. Built with vanilla JavaScript, Bootstrap 5 (CDN), and Google Fonts (Ubuntu).

## Architecture

- `manifest.json` — Chrome extension config (MV3, popup action, storage permission)
- `index.html` — Popup UI with inline styles and Bootstrap classes
- `app.js` — All application logic (CRUD, sorting, rendering, localStorage persistence)
- `icon{16,48,128}.png` — Extension toolbar icons (light blue with white "T")

## Data Model

Todos are stored in `localStorage` as JSON array. Each item: `{ text, done, priority }` where priority is `"high"`, `"medium"`, or `"low"`. List auto-sorts by priority on add/change.

## Development

No build step. To test changes:
1. Go to `chrome://extensions/` with Developer mode enabled
2. Click "Load unpacked" and select this directory
3. After edits, click the reload button on the extension card

Inline scripts are not allowed in Chrome extensions — all JS must be in `app.js`.

## Key Behaviors

- Tasks are added by pressing Enter (no submit button)
- Double-click task text to edit inline
- Priority is set per-item via an inline dropdown (defaults to medium)
- Priority colors: red (high), orange (medium), grey border (low) shown as left border


