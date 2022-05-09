<p align="center">

<img width="250" src="./hooks.svg" alt="Two fishing hooks">

</p>

# @openformation/react-hooks

> Common react hooks for web application development

## ⚠⚠⚠ Still under development ⚠⚠⚠

This package is still under development. This message will disappear once the package is ready for testing.

## Packages

| package name                    | stability | description                                           | Link to README                                |
| ------------------------------- | --------- | ----------------------------------------------------- | --------------------------------------------- |
| `@openformation/react-hooks`    | pre-alpha | Aggregate package containing all hooks                | [README](./packages/react-hooks/README.md)    |
| `@openformation/use-business`   | pre-alpha | Handle busy state for multiple asynchronous processes | [README](./packages/use-business/README.md)   |
| `@openformation/use-service`    | pre-alpha | Bind services to a react component instance           | [README](./packages/use-service/README.md)    |
| `@openformation/use-pagination` | pre-alpha | Setup a pagination context and exposes api            | [README](./packages/use-pagination/README.md) |

## Adding a new hooks package

You can easily start a new package by running

```
pnpm gen
```

This starts a [plop](https://plopjs.com/) generator, which will ask you the following questions:

```
? What is your name? Jane Doe
? What is your E-mail Address? jane.doe@example.com
? What's the name of the package (without vendor scope)? use-lastest-value
? Finally, what does the new package do? Keeps track of the latest value from an Observable or Promise
```

After you've answered all questions, you'll find your new package under `packages/`.

Please keep in mind that still needs to be added to the aggregate package under `packages/react-hooks/` manually.

## LICENSE

see [LICENSE](./LICENSE)
