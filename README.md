# Track Management UI

An Angular single-page front-end for the Track Management API. It lets a music
distribution team browse an artist's catalog of tracks, filter by status, and drill into a
single track to see its release info and per-DSP (Spotify, Apple Music, Amazon Music, etc.)
distribution status.

## Overview

The app is a standalone-components Angular 19 project with two views: a track list and a
track detail page. It talks to the Track Management backend API over HTTP using a single
`TrackService`.

## Features

- **Track List** — displays every track's title, artist name, genre, and status, with a
  dropdown to filter by status (`Draft` / `Submitted` / `Distributed`)
- **Track Detail** — shows a track's full info (artist, ISRC, genre, release date, status)
  and the list of DSPs it has been distributed to, along with each distribution's status
  and submission date
- Loading and error states on both pages
- Client-side routing between list and detail views

## Tech Stack

- **Angular 19** (standalone components, `@angular/router`, `@angular/forms`)
- **RxJS** for HTTP observables
- **Bootstrap 5** for styling
- **Karma / Jasmine** for unit tests

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS) and npm
- [Angular CLI](https://angular.dev/tools/cli) 19.x (`npm install -g @angular/cli`, optional —
  `npx ng` also works via the local dev dependency)
- The Track Management backend running and reachable (see the backend `README.md`)

## Installation

From the `Track-Management-Angular` directory:

```bash
npm install
```

## How to Run the Application

```bash
npm start
```

(equivalent to `ng serve`). This starts the dev server at `http://localhost:4200/` with
live reload on source changes. The backend's CORS policy is configured specifically to
allow requests from this origin.

## Environment Configuration

The API base URL is set in `src/environments/environment.ts`:

```ts
export const environment = {
  apiBaseUrl: 'https://localhost:44369/api'
};
```

This is the single environment file used for both development and production builds (no
`environment.prod.ts` / file replacement is configured). If your backend is running on a
different host/port (for example `https://localhost:7091` when started via
`dotnet run`), update `apiBaseUrl` accordingly before running or building the app.

## Available Pages

| Route          | Component               | Description                                                        |
|----------------|--------------------------|----------------------------------------------------------------------|
| `/`            | `TrackListComponent`     | Lists all tracks with artist, genre, status, and a status filter    |
| `/track/:id`   | `TrackDetailsComponent`  | Shows a track's details and its DSP distribution statuses           |
| `**`           | —                        | Redirects to `/`                                                     |

## Project Structure

```
src/app/
├── core/
│   ├── models/                  # Artist, Track, TrackDetails, TrackDistribution types
│   └── services/
│       └── track.service.ts     # HTTP calls to the Tracks API
├── pages/
│   ├── track-list/              # Track List view
│   └── track-details/           # Track Detail view
├── app.component.*              # Root component (router outlet)
├── app.config.ts                # App-wide providers (router, HttpClient)
└── app.routes.ts                # Route definitions
```

## Production Build

```bash
ng build
```

Build artifacts are emitted to `dist/track-management-ui`.

## Connecting to the Backend

- Ensure the backend is running first and note which URL it's listening on (see the
  backend `README.md` for `dotnet run` output/ports).
- Update `src/environments/environment.ts` → `apiBaseUrl` to match that URL, including
  the `/api` suffix.
- The endpoints this app currently calls are read-only (`GET /api/tracks`,
  `GET /api/tracks/{id}`) — no login/JWT flow is implemented in the UI itself. To use
  JWT-protected backend endpoints (e.g. distributing a track) from outside this UI, obtain
  a token via `POST /api/auth/token` as described in the backend README and send it as an
  `Authorization: Bearer <token>` header.
