<p align="center">

<img width="250" src="./hooks.svg" alt="Two fishing hooks">

</p>

# @openformation/use-pagination

> Sets up a pagination state and exposes helpers to control it

## Installation

Using npm:

```
npm install --save @openformation/use-pagination
```

Using yarn:

```
yarn add @openformation/use-pagination
```

Using pnpm:

```
pnpm add --save @openformation/use-pagination
```

## API

```typescript
usePagination = (spec: {
  initial?: number,
  min?: number,
  max?: number,
  steps?: number,
}) => {
  current: number,
  isCurrent: (checkValue: number) => boolean,
  setCurrent: (nextValue: number) => void,
  next: () => void,
  prev: () => void,
  hasNext: () => boolean, 
  hasPrev: () => boolean, 
}
```

`initial` is the page value, pagination will start to work at. If this value hurts the boundaries given by `min` and/or `max`, it internally gets clamped to fit the closest boundary.
*Optional, default value is 0.*

`min` & `max` define the boundaries for the value that `current` can take. 
*Optional, default values are `-Infinity` for `min` and `Infinity` for `max`*

`steps` is the amount that `current` will be increased or decreased by, using `next` or `prev` respectively. The boundaries set by `min` and/or `max` will be respected for those operations.
*Optional, default value is 1.*
 
*Returned API*

`current` is the current page value itself.

`isCurrent` takes a number and checks for equality to current page value.

`next` increases `current` by `steps`, but not higher than `max`.

`prev` decreases `current` value by `steps`, but not lower than `min`.

`hasNext` checks for increasability. It returns `true` if `next()` would increase `current`, otherwise `false`.

`hasPrev` checks for decreasability. It returns `true` if `prev()` would decrease `current`, otherwise `false`.

## Usage

Pagination is a widely used UX pattern in web development, so an implementation should be easy to do. 

Another use-case could be a slidable.

```typescript
const SlideShow: React.FC<{
  slides: Slide[], 
}> = props => {
  const { prev, next, hasPrev, hasNext, setCurrent, current } = usePagination({
    initial: 0,
    min: 0,
    max: props.slides.length - 1,
  });

  return (
    <SlideView>
      <RowWithSlides slideTo={current}>
        {props.slides.map(Slide)}
      </RowWithSlides>
      <Thumbs>
        {props.slides.map((slide, index) => (
          <Thumb 
            key={index}
            onClick={() => setCurrent(index)}
          />
        ))}
      </Thumbs>
      <PrevButton onClick={prev} disabled={!hasPrev()} />
      <NextButton onClick={next} disabled={!hasNext()} />
    </SlideView>
  );
}
```

A not as obvious use-case is a tab-system.

```typescript
enum Tabs {
  "FEATURES",
  "TEAM",
  "PRICING",
  "FAQ",
}

const Tabs: React.FC = () => {
  const { isCurrent: isActiveTab, setCurrent: setTab } = usePagination({
    initial: Tabs.FEATURES,
  });

  return (
    <TabContainer>
      <TabBar>
        <Tab onClick={() => setTab(Tabs.FEATURES)}>Features<Tab>
        <Tab onClick={() => setTab(Tabs.TEAM)}>Team<Tab>
        <Tab onClick={() => setTab(Tabs.PRICING)}>Pricing<Tab>
        <Tab onClick={() => setTab(Tabs.FAQ)}>Questions<Tab>
      </TabBar>
      <TabContents>
        {isActiveTab(Tabs.FEATURES) ? <ContentForFeatures /> : null}
        {isActiveTab(Tabs.TEAM) ? <ContentForTeam /> : null}
        {isActiveTab(Tabs.PRICING) ? <ContentForPricing /> : null}
        {isActiveTab(Tabs.FAQ) ? <ContentForFaq /> : null}
      </TabContents>
    </TabContainer>
  );
}

```

## LICENSE

see [LICENSE](./LICENSE)
