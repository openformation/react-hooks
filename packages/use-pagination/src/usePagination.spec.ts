/**
 * Copyright (c) Open Formation GmbH.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * @author Henrik Radandt <henrik.radandt@openformation.io>
 *
 */

import { renderHook, act } from "@testing-library/react-hooks";

import { usePagination } from "./usePagination";

describe("usePagination", () => {
  it("has a default pagination starting at 0 and steps of 1", () => {
    const { result } = renderHook(() => usePagination());

    const initialValue = result.current.current;

    act(() => result.current.next());

    const valueAfterNextOnce = result.current.current;

    act(() => result.current.next());
    act(() => result.current.next());

    const afterNextThreeTimes = result.current.current;

    expect(initialValue).toBe(0);
    expect(valueAfterNextOnce).toBe(1);
    expect(afterNextThreeTimes).toBe(3);
  });

  it("adjusts initial value to fit boundaries", () => {
    const { result: resultForTooLowInitialValue } = renderHook(() => usePagination({
      initial: 5,
      min: 10
    }));

    const { result: resultForTooHighInitialValue } = renderHook(() => usePagination({
      initial: 5,
      max: 3
    }));

    expect(resultForTooLowInitialValue.current.current).toBe(10);
    expect(resultForTooHighInitialValue.current.current).toBe(3);
  });

  it("is increasable infinitely by default", () => {
    const { result } = renderHook(() => usePagination({
      steps: Infinity,
    }));

    act(() => result.current.next());
    act(() => result.current.next());
    
    expect(result.current.current).toBe(Infinity);
  });

  it("is increasable until a defined maximum", () => {
    const { result } = renderHook(() => usePagination({
      max: 7,
      steps: 3,
    }));

    act(() => result.current.next());
    act(() => result.current.next());
    act(() => result.current.next());
    
    expect(result.current.current).toBe(7);
  });

  it("is decreasable until a defined minimum", () => {
    const { result } = renderHook(() => usePagination({
      min: 0,
    }));

    act(() => result.current.prev());
    act(() => result.current.prev());
    
    expect(result.current.current).toBe(0);
  });

  it("increases current page by steps on calling exposed helper 'next'", () => {
    const { result: resultForDefaultSetup } = renderHook(() => usePagination());
    const { result: resultForSetupWithSteps } = renderHook(() => usePagination({
      steps: 22,
    }));
    const { result: resultForSetupWithStepsAndInitialValue } = renderHook(() => usePagination({
      steps: 99,
      initial: 20001
    }));

    act(() => resultForDefaultSetup.current.next());
    act(() => resultForSetupWithSteps.current.next());
    act(() => resultForSetupWithStepsAndInitialValue.current.next());
  
    expect(resultForDefaultSetup.current.current).toBe(1);
    expect(resultForSetupWithSteps.current.current).toBe(22);
    expect(resultForSetupWithStepsAndInitialValue.current.current).toBe(20100);
  });

  it("decreases current page by steps on calling exposed helper 'prev'", () => {
    const { result: resultForDefaultSetup } = renderHook(() => usePagination());
    const { result: resultForSetupWithSteps } = renderHook(() => usePagination({
      steps: 10,
    }));
    const { result: resultForSetupWithStepsAndInitialValue } = renderHook(() => usePagination({
      steps: 2,
      initial: 100
    }));

    act(() => resultForDefaultSetup.current.prev());
    act(() => resultForSetupWithSteps.current.prev());
    act(() => resultForSetupWithStepsAndInitialValue.current.prev());
  
    expect(resultForDefaultSetup.current.current).toBe(-1);
    expect(resultForSetupWithSteps.current.current).toBe(-10);
    expect(resultForSetupWithStepsAndInitialValue.current.current).toBe(98);
  });

  it("changes current to given page by exposed `setCurrent`", () => {
    const { result } = renderHook(() => usePagination({}));

    act(() => result.current.setCurrent(42));
    
    expect(result.current.current).toBe(42);
  });

  it("always sets current to closest boundary", () => {
    const { result } = renderHook(() => usePagination({
      min: 10,
      max: 200
    }));

    act(() => result.current.setCurrent(5));
    const valueAfterSetTooLow = result.current.current;

    act(() => result.current.setCurrent(599));
    const valueAfterSetTooHigh = result.current.current;
    
    expect(valueAfterSetTooLow).toBe(10);
    expect(valueAfterSetTooHigh).toBe(200);
  });

  it("checks if increasable by exposed 'hasNext'", () => {
    const { result } = renderHook(() => usePagination({
      initial: 4,
      steps: 10,
      max: 6,
    }));

    const increasableBeforeReachingMax = result.current.hasNext();
    act(() => result.current.next());
    const increasableAfterReachingMax = result.current.hasNext();

    expect(increasableBeforeReachingMax).toBe(true);
    expect(increasableAfterReachingMax).toBe(false);
  });

  it("checks if decreasable by exposed 'hasPrev'", () => {
    const { result } = renderHook(() => usePagination({
      min: 0,
    }));

    const decreasableIfAtMin = result.current.hasPrev();
    act(() => result.current.setCurrent(20));
    const decreasableAfterSetHigherThanMin = result.current.hasPrev();

    expect(decreasableIfAtMin).toBe(false);
    expect(decreasableAfterSetHigherThanMin).toBe(true);
  });

  it("compares a given value for equality to current by exposed 'isCurrent'", () => {
    const { result } = renderHook(() => usePagination({
      initial: 333,
    }));

    expect(result.current.isCurrent(10)).toBe(false);
    expect(result.current.isCurrent(Infinity)).toBe(false);
    expect(result.current.isCurrent(333)).toBe(true);
  });
});
