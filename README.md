# SurgLogs dictionary

## App

Project is created with [create react app](https://create-react-app.dev) so there is only
`yarn install` (or `npm install`) followed by `yarn start` needed. The project dependencies 
are maintained with yarn. App is run by default on port 3000 (this can be changed in `.env`
file or by specifying `PORT` env variable). I need to emphasize that you have to change
also `CYPRESS_BASE_URL` env variable to match this port.

Components used in app are created by [Material-UI](https://material-ui.com).
Centralized theme, my skills with this framework and some performance features of library
are the main reasons for using this library.

The app contains a few issues which can be resolved (eg. google can't translate from each
language to any) but I considered them irrelevant.

## Fineness

E2E Tests are run with [cypress](https://www.cypress.io). There are *login* and *basic dictionary
operations* (create, remove, edit) tested. [StandardJS](https://standardjs.com) code liner is used
for code cleanliness. A pre-commit hook with `husky` is created and code is linted before each commit
so there is surely clean code in the repository.

## Work

A toggl report is attached in file `report.pdf`. I was working in 
[JetBrains PHPStorm](https://www.jetbrains.com/phpstorm/) IDE because it offers many
great features for fast development (type checking, type hinting, code templates,...).
Also creators of this IDE offers many other IDEs in one bundle which I use.

I want to add that this task was the most interesting from the other entry projects
I was working on! I hope you'll find this work professional and creative.
