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

```typescript
const LoadMoreList = <I>(props: {
  loadItems: (page: number) => Promise<I[]>;
  renderItem: (item: I) => React.ReactNode;
}) => {
  const [items, setItems] = React.useState<I[]>([]);
  const [page, setPage] = React.useState(0);
  const business = useBusiness();
  const loadMore = Reac.useCallback(() => setPage((page) => page + 1), [
    setPage,
  ]);

  React.useEffect(async () => {
    const loadedItems = await business.perform(() => props.loadItems(page));

    setItems((items) => [...items, ...loadedItems]);
  }, [page]);

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
      <button onClick={loadMore}>
        Load more
      </button>
    </>
  );
};
```

## LICENSE

see [LICENSE](./LICENSE)
