# Upstart project interview

A page, a form, and SQLite. Open this folder on its own before Friday.
The prompt will add requirements. Do not build those in advance.

## Run

```bash
npm install
npm test
npm run dev
```

App: http://127.0.0.1:5173
API: http://127.0.0.1:3001

Reset the database by deleting `server/data/app.sqlite` and restarting.

## Why SQLite

The interview grades database modeling. SQLite is SQL, so a new column is
one `ALTER` and one field on the form. Postgres is what you would name in
the design hour. This file is what you want running when the prompt lands.
No Docker, no password, no second process.

Node's built-in `node:sqlite` is the driver. Say that if they ask. You did
not add an ORM.

## When they add a requirement

1. Column in `server/db.ts` (`ALTER TABLE` or a new table).
2. Field on the form in `client/src/App.tsx`.
3. Pass it through `POST /api/items`.
4. One test in `server/db.test.ts` if there is time.

TypeScript. React is the page. Express is the API. Salesforce UI is
Lightning. Do not call this Next.js.
