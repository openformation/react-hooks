/**
 * Copyright (c) Open Formation GmbH.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * @author Wilhelm Behncke <wilhelm.behncke@openformation.io>
 *
 */

import { renderHook } from "@testing-library/react-hooks";

import { useService } from "./useService";

describe("useService", () => {
  it("creates a service from a given factory and dependencies", () => {
    const serviceFactoryFn = jest.fn(
      (deps: { dep1: string; dep2: string }) => () =>
        `"${deps.dep1}" and "${deps.dep2}"`
    );

    const { result } = renderHook(() =>
      useService(serviceFactoryFn, { dep1: "Hello", dep2: "World" })
    );

    expect(serviceFactoryFn).toBeCalledWith(
      expect.objectContaining({ dep1: "Hello", dep2: "World" })
    );
    expect(result.current()).toBe('"Hello" and "World"');
  });

  it("always returns the same service instance on re-renders as long as dependencies don't change", () => {
    const serviceFactoryFn = jest.fn(
      (deps: { dep1: string; dep2: string }) => () =>
        `"${deps.dep1}" and "${deps.dep2}"`
    );

    const { result, rerender } = renderHook(() =>
      useService(serviceFactoryFn, { dep1: "Hello", dep2: "World" })
    );
    const instance1 = result.current;

    rerender();

    const instance2 = result.current;

    rerender();

    const instance3 = result.current;

    expect(instance1).toBe(instance2);
    expect(instance1).toBe(instance3);
    expect(instance2).toBe(instance3);
  });

  it("creates a new service instance as soon as dependencies change", () => {
    const serviceFactoryFn = jest.fn(
      (deps: { dep1: string; dep2: string }) => () =>
        `"${deps.dep1}" and "${deps.dep2}"`
    );

    const { result, rerender } = renderHook(
      (props: { dep1: string }) =>
        useService(serviceFactoryFn, { dep1: props.dep1, dep2: "World" }),
      { initialProps: { dep1: "Hello" } }
    );
    const instance1 = result.current;

    expect(instance1()).toBe('"Hello" and "World"');

    rerender({ dep1: "Bonjour" });

    const instance2 = result.current;

    expect(instance1).not.toBe(instance2);
    expect(instance2()).toBe('"Bonjour" and "World"');
  });
});
