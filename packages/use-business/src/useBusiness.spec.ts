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

import { renderHook, act } from "@testing-library/react-hooks";

import { useBusiness } from "./useBusiness";

describe("useBusiness", () => {
  it("isn't busy initially", () => {
    const { result } = renderHook(() => useBusiness());

    expect(result.current.isBusy).toBe(false);
  });

  it("turns busy when a process is performed and stays busy until that process is finished", async () => {
    const { result } = renderHook(() => useBusiness());
    let process: Promise<void> = Promise.resolve();

    await act(async () => {
      process = result.current.perform(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
    });

    expect(result.current.isBusy).toBe(true);

    await act(() => process);

    expect(result.current.isBusy).toBe(false);
  });

  it("stays busy until all started processes are finished", async () => {
    const { result } = renderHook(() => useBusiness());
    let process1: Promise<void> = Promise.resolve();
    let process2: Promise<void> = Promise.resolve();
    let process3: Promise<void> = Promise.resolve();

    await act(async () => {
      process1 = result.current.perform(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
      process2 = result.current.perform(
        () => new Promise((resolve) => setTimeout(resolve, 200))
      );
      process3 = result.current.perform(
        () => new Promise((resolve) => setTimeout(resolve, 300))
      );
    });

    expect(result.current.isBusy).toBe(true);

    await act(() => process1);

    expect(result.current.isBusy).toBe(true);

    await act(() => process2);

    expect(result.current.isBusy).toBe(true);

    await act(() => process3);

    expect(result.current.isBusy).toBe(false);
  });
});
