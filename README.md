# CAEN Rev. 3 — Romanian Activity Codes Explorer

A React frontend for browsing and searching Romanian CAEN codes (Rev. 3 / NACE Rev. 2.1), backed by the [caen-api.ro](https://caen-api.ro) REST API.

## Features

- **Full-text search** — query by code or activity name with debounced live results
- **Autocomplete suggestions** — inline dropdown showing favorites first, then API matches
- **Favorites** — pin any code to localStorage for quick access across sessions
- **Hierarchy display** — each result shows its section, division, and group
- **Responsive UI** — built with Tailwind CSS v4, works on mobile and desktop
- **Docs & About pages** — API documentation and project background included

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| API | [caen-api.ro](https://caen-api.ro) |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
npm run build    # Type-check and build for production
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Project Structure

```
src/
+-- components/       # Shared UI components (SearchBar, ResultCard, Navbar, …)
+-- hooks/
¦   +-- useCAENSearch.ts   # Debounced search hook with abort-controller support
¦   +-- useFavorites.ts    # LocalStorage-backed favorites state
+-- pages/            # Route-level components (Home, About, Docs)
+-- services/
¦   +-- caenApi.ts    # Typed fetch wrappers for caen-api.ro
+-- types/
    +-- caen.ts       # CAENEntry and SearchResponse interfaces
```

## API

All data is fetched from `https://caen-api.ro`.

| Endpoint | Description |
|---|---|
| `GET /caen?q=&limit=&offset=` | Search codes by keyword |
| `GET /caen/:code` | Fetch a single entry by its 4-digit code |

## About

Developed by [Mapnology SRL](https://mapnology.eu). Data sourced from INS (Institutul Na?ional de Statistica) and ONRC official classifications.

## License

See [LICENSE](LICENSE).
