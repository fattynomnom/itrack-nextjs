### About

This is a work-in-progress to learn NextJS
The purpose is to create an app that can help keep track of the user's monthly expenses and budgeting

### Pre-requisites

1. Run `cp .env.example .env`
1. Create a new Firebase project as this project uses Firebase Authentication
1. Input the newly created Firebase project credentials into `.env` (You can also obtain your credentials by going into your app console, **Settings > General**)
 <!-- 1. Generate a service account key by going to **Settings > Service accounts > Firebase Admin SDK > Generate new private key** (This is because we are using Firebase authentication with NextJS Auth)
1. Save the generated key into the root directory
1. Update `GOOGLE_APPLICATION_CREDENTIALS` variable in your `.env` with the relative path of the generated service account key (Ex: `./your-app-firebase-admin-sdk.json`) -->

### Running in local

1. Install dependencies with `npm install`
1. Run `npm run dev`

### Running tests

1. Run `npm run test`

### Todos

-   [x] Registration
-   [x] Login
-   [x] Registration tests
-   [x] Login tests
-   [x] Registration responsiveness
-   [x] Login responsiveness
-   [] Middleware for authenticated & unauthenticated users
-   [] Handle error for too many incorrect logins (`auth/too-many-requests`)
-   [] Commitments CRUD UI
