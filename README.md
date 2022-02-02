# Url Shortener 📦

This is a server that uses Node.js, Express and TypeScript.

## Installation

To run this project you'll need:
- Node.js (version 10+)
- `npm` available on your path in your CLI

Install dependencies with NPM:
```bash
npm install
```

## NPM commands

You can run the following with `npm run ...`:

- `build`: builds the project using TypeScript, output will be in the `dist` folder;
- `start`: starts the server in development mode, automatically reloading when code changes;
- `test`: runs tests in watch mode using Jest;
- `format`: formats all code using [Prettier](https://github.com/prettier/prettier)

## Formatting

We use [Prettier](https://github.com/prettier/prettier) to format TypeScript source code. You can see the
settings in `.prettierc`.

Additionally, [EditorConfig](https://editorconfig.org/) is used to keep in sync indentation and some other minor editor settings.

## Tests

You can add additional tests in the `./test/integration.test.ts` file.
The project is set up to use [Jest](https://jestjs.io/docs/en/getting-started.html) with Typescript, you can run the tests using:

```bash
npm run test
```
