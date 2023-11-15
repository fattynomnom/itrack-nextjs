### About

This is a work-in-progress to learn NextJS

The purpose is to create an app that can help keep track of the user's monthly expenses and budgeting

Please note that all data displayed is mocked until backend integrations can be completed

Backend: [itrack-expressjs](https://github.com/fattynomnom/itrack-expressjs)

Development documentation [here](https://fattynomnom.github.io/)

### Pre-requisites

1. Install dependencies with `npm install`
1. Setup `.env` file with `cp .env.example .env`
1. Create new Auth0 application
1. Update Auth0 application credentials in `.env`

#### Optional

The following steps are optional, you only need to do it if you want to use the `/login` and `/register` pages, but right now those pages are not in use:

1. Create a new Firebase project as this project uses Firebase Authentication
1. Input the newly created Firebase project credentials into `.env` (You can also obtain your credentials by going into your app console, **Settings > General**)

### Running in local

Run `npm run dev`

### Running tests

Run `npm run test`
