<p align="center">

<img width="250" src="./hooks.svg" alt="Two fishing hooks">

</p>

# @openformation/use-service

> Bind services to a react component instance

## Installation

Using npm:

```
npm install --save @openformation/use-service
```

Using yarn:

```
yarn add @openformation/use-service
```

Using pnpm:

```
pnpm add --save @openformation/use-service
```

## API

```typescript
useService = (
  serviceFactoryFn: (deps: Dependencies) => Service,
  deps: Dependencies
) => Service
```

`serviceFactoryFn` is a function that takes one argument `Dependencies` and returns a `Service`.

`Dependencies` are a Record of `string` keys and anything as values.

A `Service` can be anything.

## Usage

Let's say we have an API client implemented like this:

```typescript
const makeApi = (deps: { serviceUri: string }) => ({
  allTodos: () => fetch(`${serviceUri}/todos`),
  addTodo: (todo: { label: string }) =>
    fetch(`${serviceUri}/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(todo),
    }),
});
```

`makeApi` is a higher order function that accepts an object `deps` containing a record of dependencies.

We can now use the `useService` hook to bind our API client to a React component like this:

```typescript
import { useService } from "@openformation/use-service";

const TodoList: React.FC<{ serviceUri: string }> = (props) => {
  const api = useService(makeApi, { serviceUri: props.serviceUri });
  const createTodo = React.useCallback(() => api.addTodo({ label: "New Todo" }), [api]);

  /* ... */
};
```

As long as the dependencies that we passed as a second argument don't change, we'll always receive the same instance of the service created via `makeApi`.

There is only one rule we need to follow: The structure of the `deps` object must not change.

## LICENSE

see [LICENSE](./LICENSE)
