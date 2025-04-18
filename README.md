# DTS Developer Technical Test for HM Courts and Tribunals Service

## Overview

This is an application that allows case workers to create and manage tasks.

## Project Structure

- The project is structured using SvelteKit and TypeScript as the frontend and backend respectively.

- The UI is built using Tailwind CSS and DaisyUI.

- The database is managed using Drizzle ORM.

- The tests are managed using Vitest.

- The API docs are managed using Bruno.

- PNPM is used as the package manager.


## Features

- Create a task
- View a task
- Update a task
- Delete a task
- *Very* Crude Auth
- Filter tasks (TODO)


## Setup

- Run the following command to install the dependencies.

```bash
pnpm install
```

## Development

- Run the following command to start the development server.

```bash
pnpm dev
```

- Configure the `.env` file with the correct values.

```bash
cp .env.example .env
```

## Database

- Run the following command to push the schema to the database (SQLite was used for this test).

```bash
pnpm db:push
```

## Build

```bash
pnpm build
```

## Testing

- Run the following command to run the tests.

```bash
pnpm test:unit
```

## API Docs

- The API docs can be found in the `API Docs` folder. Documentation was generated using [Bruno](https://www.usebruno.com/) and [Postman](https://www.postman.com/). You can import the collection into either of these tools.

## Screenshots

<img width="362" alt="Image" src="https://github.com/user-attachments/assets/62fc7f23-4a08-43d5-8b56-1c6068601866" />
<img width="364" alt="Image" src="https://github.com/user-attachments/assets/9d8efe83-8229-46de-a056-2ec7c0fe70eb" />
