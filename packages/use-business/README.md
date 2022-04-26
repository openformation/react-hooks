<p align="center">

<img width="250" src="./hooks.svg" alt="Two fishing hooks">

</p>

# @openformation/use-business

> Handle busy state for multiple asynchronous processes

## Installation

Using npm:

```
npm install --save @openformation/use-business
```

Using yarn:

```
yarn add @openformation/use-business
```

Using pnpm:

```
pnpm add --save @openformation/use-business
```

## API

```typescript
useBusiness = () => Business;

interface Business {
  readonly isBusy: boolean;
  perform<R>(processFn: () => Promise<R>): R;
}
```

## Usage

Let's say, we have a component `LoadMoreList` that renders a list of items and is able to fetch more items with a touch of a button and add them to the list:

```typescript
const LoadMoreList = <I>(props: {
  loadItems: (page: number) => Promise<I[]>;
  renderItem: (item: I) => React.ReactNode;
}) => {
  const [items, setItems] = React.useState<I[]>([]);
  const [page, setPage] = React.useState(0);
  const business = useBusiness();
  const loadMore = React.useCallback(() => setPage((page) => page + 1), [
    setPage,
  ]);

  React.useEffect(async () => {
    const loadedItems = await props.loadItems(page);

    setItems((items) => [...items, ...loadedItems]);
}, [page, setItems]);

  return (
    <>
      <ul>
        {items.map((item, index) => (
          <li key={String(index)}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
      <button onClick={loadMore}>
        Load more
      </button>
    </>
  );
};
```

Because `loadItems` may take a while, we now want to show a loading Indicator while it's running. Also, the button should be disabled while new items are being loaded to prevent weird behavior through too many clicks and parallel fetching.

This is where `useBusiness` comes in. It provides a function `perform` that can be wrapped around the call to any process that returns a `Promise`. It also exposes a property `isBusy` that'll be `true` as long as any `Promise` that has been started is still running.

The integration looks like this:

```typescript
const LoadMoreList = <I>(props: {
  loadItems: (page: number) => Promise<I[]>;
  renderItem: (item: I) => React.ReactNode;
}) => {
  const [items, setItems] = React.useState<I[]>([]);
  const [page, setPage] = React.useState(0);
  const business = useBusiness();
  const loadMore = React.useCallback(() => setPage((page) => page + 1), [
    setPage,
  ]);

  React.useEffect(async () => {
    const loadedItems = await business.perform(() => props.loadItems(page));

    setItems((items) => [...items, ...loadedItems]);
  }, [page, setItems]);

  return (
    <>
      <ul>
        {items.map((item, index) => (
          <li key={String(index)}>
            {renderItem(item)}
          </li>
        ))}
        {business.isBusy ? <li key="loading">Loading...</li> : null}
      </ul>
      <button onClick={loadMore} disabled={business.isBusy}>
        Load more
      </button>
    </>
  );
};
```

**Hint:** If `perform` was called multiple times, `isBusy` stays `true` until all `Promises` are settled.

## LICENSE

see [LICENSE](./LICENSE)
