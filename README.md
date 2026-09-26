# MERN Authentication System — Frontend

The frontend client for a MERN authentication system, built with React and Vite. It provides registration, login, account verification, password recovery, and an authenticated home page backed by a REST API.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=20232a)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4)](https://axios-http.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Live Demo

**Live Demo:** [MERN Authentication Frontend](https://mern-authentication-frontend-nine.vercel.app/)

**Repository:** [Murtuza-Ahmed/mern-authentication-frontend](https://github.com/Murtuza-Ahmed/mern-authentication-frontend)

## Overview

This repository contains the browser application for the authentication system. The React client sends HTTP requests to the backend API; it does not connect directly to MongoDB. The backend is responsible for authentication decisions, authorization, and database access.

```text
React + Vite Frontend
	|
	| HTTP / REST API
	v
Node.js + Express Backend
	|
	v
MongoDB
```

## Features

- Register with name, email, phone number, and password, and choose email or phone verification. The phone input is prefixed with `+92` in the current form.
- Verify an account using a five-digit OTP at `/otp-verification/:id`.
- Sign in with the login form and sign out from the authenticated home page.
- Request a password reset by email and submit a new password with the token from `/password/reset/:token`.
- Check the current user with `GET /v1/me` when the app starts. The result updates authentication state held in React context.
- Redirect unauthenticated visitors from `/` to `/auth`, and redirect authenticated visitors away from `/auth` to `/`.
- Use React Hook Form for the login and registration forms. Inputs use browser `required` validation; OTP and password recovery forms use component state.
- Display success and error messages through React Toastify. API errors use a returned message when available, with a fallback message otherwise.
- Use responsive CSS breakpoints in several page stylesheets.
- Mount Vercel Speed Insights in the React entry point for real-user frontend performance monitoring.

The frontend does not currently implement a resend-OTP control or explicit per-form pending/submitting indicators. `src/hooks/ProtectedRoute.jsx` exists, but the current route table does not use it; the home page performs its own authentication redirect.

## Tech Stack

| Technology               | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| React 18                 | UI library                                   |
| Vite 6                   | Development server and production build tool |
| React Router 7           | Client-side routing                          |
| Axios                    | HTTP/API communication                       |
| React Hook Form          | Login and registration form handling         |
| React Toastify           | User notifications                           |
| `@vercel/speed-insights` | Real-user frontend performance monitoring    |
| ESLint 9                 | Code quality and static analysis             |

`src/api/` contains the API base URL, endpoint paths, Axios client/interceptor, and service functions. `src/context/` holds authentication state. `src/pages/` and `src/components/` contain routed views and their UI; `src/routes/` declares the client routes; `src/styles/` contains page and component styles.

## Authentication Architecture

```text
Register ──> POST /v1/register ──> OTP verification ──> POST /v1/verify-account
							      |
Login ─────> POST /v1/login ──────────────────────────────────┤
							      v
							AuthContext
							      |
							      v
						     Authenticated home
```

`AuthProvider` keeps `isAuthenticated`, `user`, and the initial loading flag in React state. The app requests `/v1/me` on startup and sets the current user from the API response; the frontend does not use `localStorage` or `sessionStorage` for the session. The Axios client sets `withCredentials: true` and the request interceptor adds `Authorization: Bearer <accessToken>` when the current context user has an `accessToken`. A `401` response calls the context logout handler to clear the client-side state.

The logout action calls `GET /v1/logout` and clears context state after a successful response. These client-side redirects are navigation behavior, not a substitute for authorization checks in the backend.

## API Integration

The frontend uses `VITE_PUBLIC_API_URL` as the Axios base URL. Service functions append the following paths:

| Operation              | Method and path                 |
| ---------------------- | ------------------------------- |
| Login                  | `POST /v1/login`                |
| Register               | `POST /v1/register`             |
| Verify account         | `POST /v1/verify-account`       |
| Request password reset | `POST /v1/password/forgot`      |
| Reset password         | `PUT /v1/password/reset/:token` |
| Logout                 | `GET /v1/logout`                |
| Current user           | `GET /v1/me`                    |

## Environment Variables

Create a local `.env.local` file with the public API base URL:

```dotenv
VITE_PUBLIC_API_URL=https://your-backend-domain.com/api
```

The frontend appends its `/v1/...` endpoint paths to this base URL, so configure the base path to match the backend API. Vite embeds `VITE_*` values into the client bundle at build time. They are visible to users; use them only for public configuration. Never put passwords, tokens, database credentials, signing keys, or other backend secrets in a `VITE_*` variable. Do not commit `.env` files. Configure the production value in Vercel and rebuild/redeploy after changing it. This repository does not currently include an `.env.example` file.

## Installation

```bash
git clone https://github.com/Murtuza-Ahmed/mern-authentication-frontend.git
cd mern-authentication-frontend
npm install
```

Set `VITE_PUBLIC_API_URL` in `.env.local` before starting the app. The Axios client throws an error if this variable is missing.

## Development

```bash
npm run dev
```

Open the local URL printed by Vite in the terminal (typically `http://localhost:5173`).

## Production Build

```bash
npm run build
npm run preview
```

`npm run build` creates the production bundle in `dist/`. `npm run preview` serves that built bundle locally for a production-like check.

## Linting

```bash
npm run lint
```

This runs ESLint across the project.

## Deployment — Vercel

1. Push the frontend repository to GitHub and import it into Vercel.
2. Set `VITE_PUBLIC_API_URL` in the Vercel project’s environment variables for the required deployment environments.
3. Use Vite’s production build command, `npm run build`; the build output is `dist/`.
4. Deploy the project. Vercel environment-variable changes take effect in a new build, so redeploy after updating them.

**Live deployment:** [mern-authentication-frontend-nine.vercel.app](https://mern-authentication-frontend-nine.vercel.app/)

This repository deploys the frontend only; it does not deploy or configure the backend API.

## Vercel Speed Insights

The project includes `@vercel/speed-insights`, with `SpeedInsights` mounted from `src/main.jsx`. It provides real-user frontend performance visibility, including Core Web Vitals, for supported Vercel deployments. It is not backend monitoring. Metrics require a deployed site receiving traffic and must be viewed in the Vercel dashboard; this repository does not contain dashboard data.

## Backend Integration

This repository is the frontend portion of the system. The client sends REST API requests to the backend, which handles authentication and communicates with MongoDB:

```text
Frontend  ->  REST API  ->  Backend  ->  MongoDB
```

**Backend/API repository:** [Murtuza-Ahmed/mern-authentication-backend](https://github.com/Murtuza-Ahmed/mern-authentication-backend)

## Security Considerations

- Treat all `VITE_*` values as public because they are included in browser code.
- Enforce authentication and authorization in the backend; a frontend redirect can be bypassed.
- Use HTTPS for production frontend and API traffic, and configure the API URL for the intended production backend.
- Avoid returning or displaying sensitive data in API responses and error messages.
- The Axios client sends credentials and may send a Bearer access token supplied by the API. The frontend itself does not persist the context user in browser storage.

**Repository hygiene:** `.env` and `.env.production` are currently tracked by Git in this checkout. Their contents are intentionally not reproduced here. Review them locally; if either contains credentials or other secrets, rotate those values and remove the secrets from the repository history. Keep local configuration in an ignored file such as `.env.local` and never commit secrets.

## Error Handling

The Axios helpers propagate request errors, while the response interceptor clears authentication state on `401`. Login, registration, OTP verification, password recovery/reset, and logout handlers display success or error messages with React Toastify; where available, the API response’s `message` is shown. The initial `/v1/me` request clears the loading state whether it succeeds or fails. Form controls use HTML `required` validation, but there is no shared API error UI or explicit per-form pending state.

## Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the Vite development server     |
| `npm run build`   | Build the production bundle           |
| `npm run preview` | Preview the production bundle locally |
| `npm run lint`    | Run ESLint                            |

## Backend Repository

The separate backend/API repository is [Murtuza-Ahmed/mern-authentication-backend](https://github.com/Murtuza-Ahmed/mern-authentication-backend).

## Planned / Future Improvements

- Add automated component, API integration, and end-to-end tests.
- Add a resend-verification-code workflow and explicit form submission/loading feedback.
- Expand client-side validation and accessibility checks; keep all security-sensitive validation on the backend as well.
- Add a dedicated error-monitoring solution if application error reporting is required.
- Add CI checks for linting and production builds.

## License

This project is licensed under the [MIT License](LICENSE).
