<<<<<<< HEAD
# Smart Scheduler Web Portal

<p align="center">
  <strong>A modern academic scheduling command center for managing resources, constraints, timetable generation, and operational visibility.</strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=111827">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

---

## Overview

Smart Scheduler Web Portal is a role-aware administration interface for institutions that need to turn academic data, room capacity, faculty availability, and scheduling constraints into usable timetables. The portal centralizes every scheduling input, exposes real-time operational dashboards, and provides dedicated visualization views for sections, faculty members, and rooms.

The product is designed as a practical control layer for a smart timetable engine: administrators can prepare resources, define constraints, generate schedules, inspect conflicts, and track performance without moving between disconnected tools.

## Core Capabilities

| Area | What It Supports |
| --- | --- |
| Executive dashboard | High-level academic metrics, timetable status distribution, room utilization, faculty allocation, and recent system activity. |
| Academic setup | Departments, academic terms, sections, and subjects. |
| Infrastructure setup | Buildings, rooms, working days, and timeslots. |
| People management | Faculty and student resource records. |
| Constraints | Constraint types and faculty-specific scheduling constraints. |
| Timetable operations | Teaching assignments, session groups, timetable lists, timetable details, and timetable entries. |
| Visualization | Section-wise, faculty-wise, and room-wise timetable grids. |
| Scheduler Lab | Timetable generation workflow with run status, execution time, scheduled sessions, unscheduled sessions, logs, and conflict summaries. |
| Performance | Dedicated performance analytics surface for monitoring scheduling outcomes. |

## Product Flow

```text
Academic Data + Infrastructure + Users
                  |
                  v
        Constraints and Assignments
                  |
                  v
          Scheduler Generation
                  |
                  v
   Timetable Review, Visualization, and Analytics
```

## Tech Stack

- React 18 with TypeScript for a typed, component-driven frontend.
- Vite for fast local development and optimized production builds.
- Tailwind CSS for the dark, dashboard-oriented interface system.
- React Router for protected portal navigation.
- TanStack Query for server-state fetching, caching, and invalidation.
- TanStack Table for structured resource management tables.
- Axios with JWT refresh handling for API communication.
- Recharts for dashboard and utilization analytics.
- React Hook Form and Zod for form workflows and validation.
- Lucide React for consistent interface iconography.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A running Smart Scheduler API service

### Installation

```bash
npm install
```

### Environment

Create a local environment file when the backend is not served from `/api`:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

If `VITE_API_BASE_URL` is not provided, the app uses `/api` by default.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  api/                 API clients and Axios authentication handling
  components/
    layout/            Dashboard shell, sidebar, and top navigation
    ui/                Shared table, button, loading, and timetable UI
  hooks/               React Query hooks and authentication helpers
  pages/
    academics/         Departments, terms, sections, subjects
    auth/              Login experience
    constraints/       Constraint types and faculty constraints
    dashboard/         Executive analytics dashboard
    infrastructure/    Buildings, rooms, days, timeslots
    performance/       Performance analytics
    profile/           User profile
    scheduler/         Scheduler Lab
    settings/          Portal settings
    timetables/        Assignments, session groups, entries, timetable detail
    users/             Faculty and students
    visualization/     Section, faculty, and room timetable views
  utils/               Timetable utility logic
```

## Authentication

The portal uses access and refresh tokens stored in `localStorage`. API requests automatically attach the current access token. When a request returns `401`, the client attempts to refresh the session through `/auth/refresh/`; if refresh fails, the user is returned to `/login`.

Supported portal roles currently include:

- `ADMIN`
- `HOD`

## API Contract

The frontend expects a REST API under the configured base URL. Key endpoint groups used by the portal include:

- `/auth/login/`
- `/auth/refresh/`
- `/timetables/generate/`
- Resource endpoints for academics, infrastructure, users, constraints, timetables, visualization, dashboard, and performance data.

## Design Direction

Smart Scheduler uses a focused administrative interface: dense data views, dark operational surfaces, chart-driven summaries, and timetable-first visualization. The goal is to make complex institutional scheduling feel inspectable, auditable, and actionable.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and create a production build. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Run ESLint across TypeScript and React files. |

## License

This project is private and intended for Smart Scheduler portal development.
=======
# Smart Scheduler Web Portal

<p align="center">
  <strong>A modern academic scheduling command center for managing resources, constraints, timetable generation, and operational visibility.</strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=111827">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

---

## Overview

Smart Scheduler Web Portal is a role-aware administration interface for institutions that need to turn academic data, room capacity, faculty availability, and scheduling constraints into usable timetables. The portal centralizes every scheduling input, exposes real-time operational dashboards, and provides dedicated visualization views for sections, faculty members, and rooms.

The product is designed as a practical control layer for a smart timetable engine: administrators can prepare resources, define constraints, generate schedules, inspect conflicts, and track performance without moving between disconnected tools.

## Core Capabilities

| Area | What It Supports |
| --- | --- |
| Executive dashboard | High-level academic metrics, timetable status distribution, room utilization, faculty allocation, and recent system activity. |
| Academic setup | Departments, academic terms, sections, and subjects. |
| Infrastructure setup | Buildings, rooms, working days, and timeslots. |
| People management | Faculty and student resource records. |
| Constraints | Constraint types and faculty-specific scheduling constraints. |
| Timetable operations | Teaching assignments, session groups, timetable lists, timetable details, and timetable entries. |
| Visualization | Section-wise, faculty-wise, and room-wise timetable grids. |
| Scheduler Lab | Timetable generation workflow with run status, execution time, scheduled sessions, unscheduled sessions, logs, and conflict summaries. |
| Performance | Dedicated performance analytics surface for monitoring scheduling outcomes. |

## Product Flow

```text
Academic Data + Infrastructure + Users
                  |
                  v
        Constraints and Assignments
                  |
                  v
          Scheduler Generation
                  |
                  v
   Timetable Review, Visualization, and Analytics
```

## Tech Stack

- React 18 with TypeScript for a typed, component-driven frontend.
- Vite for fast local development and optimized production builds.
- Tailwind CSS for the dark, dashboard-oriented interface system.
- React Router for protected portal navigation.
- TanStack Query for server-state fetching, caching, and invalidation.
- TanStack Table for structured resource management tables.
- Axios with JWT refresh handling for API communication.
- Recharts for dashboard and utilization analytics.
- React Hook Form and Zod for form workflows and validation.
- Lucide React for consistent interface iconography.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A running Smart Scheduler API service

### Installation

```bash
npm install
```

### Environment

Create a local environment file when the backend is not served from `/api`:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

If `VITE_API_BASE_URL` is not provided, the app uses `/api` by default.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  api/                 API clients and Axios authentication handling
  components/
    layout/            Dashboard shell, sidebar, and top navigation
    ui/                Shared table, button, loading, and timetable UI
  hooks/               React Query hooks and authentication helpers
  pages/
    academics/         Departments, terms, sections, subjects
    auth/              Login experience
    constraints/       Constraint types and faculty constraints
    dashboard/         Executive analytics dashboard
    infrastructure/    Buildings, rooms, days, timeslots
    performance/       Performance analytics
    profile/           User profile
    scheduler/         Scheduler Lab
    settings/          Portal settings
    timetables/        Assignments, session groups, entries, timetable detail
    users/             Faculty and students
    visualization/     Section, faculty, and room timetable views
  utils/               Timetable utility logic
```

## Authentication

The portal uses access and refresh tokens stored in `localStorage`. API requests automatically attach the current access token. When a request returns `401`, the client attempts to refresh the session through `/auth/refresh/`; if refresh fails, the user is returned to `/login`.

Supported portal roles currently include:

- `ADMIN`
- `HOD`

## API Contract

The frontend expects a REST API under the configured base URL. Key endpoint groups used by the portal include:

- `/auth/login/`
- `/auth/refresh/`
- `/timetables/generate/`
- Resource endpoints for academics, infrastructure, users, constraints, timetables, visualization, dashboard, and performance data.

## Design Direction

Smart Scheduler uses a focused administrative interface: dense data views, dark operational surfaces, chart-driven summaries, and timetable-first visualization. The goal is to make complex institutional scheduling feel inspectable, auditable, and actionable.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and create a production build. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Run ESLint across TypeScript and React files. |

## License

This project is private and intended for Smart Scheduler portal development.
>>>>>>> 363a22acb68f03209db88f85e36af59ce80e7383
