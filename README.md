### About

This is a work-in-progress to learn NextJS

The purpose is to create an app that can help keep track of the user's monthly expenses and budgeting

Please note that all data displayed is mocked until backend integrations can be completed

### Pre-requisites

Install dependencies with `npm install`

#### Optional

The following steps are optional, you only need to do it for testing the Login and Registration page:

1. Run `cp .env.example .env`
1. Create a new Firebase project as this project uses Firebase Authentication
1. Input the newly created Firebase project credentials into `.env` (You can also obtain your credentials by going into your app console, **Settings > General**)
 <!-- 1. Generate a service account key by going to **Settings > Service accounts > Firebase Admin SDK > Generate new private key** (This is because we are using Firebase authentication with NextJS Auth)
1. Save the generated key into the root directory
1. Update `GOOGLE_APPLICATION_CREDENTIALS` variable in your `.env` with the relative path of the generated service account key (Ex: `./your-app-firebase-admin-sdk.json`) -->

### Running in local

Run `npm run dev`

### Running tests

Run `npm run test`

### Todos

-   [x] Registration
-   [x] Login
-   [x] Registration tests
-   [x] Login tests
-   [x] Registration responsiveness
-   [x] Login responsiveness
-   [] Middleware for authenticated & unauthenticated users
-   [] Handle error for too many incorrect logins (`auth/too-many-requests`)
-   [] Mobile responsiveness
