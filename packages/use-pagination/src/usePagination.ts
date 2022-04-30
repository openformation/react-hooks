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

import { useCallback, useState } from "react";

export const usePagination = ({
  initial = 0,
  steps = 1,
  min = -Infinity,
  max = Infinity,
}: {
  initial?: number;
  min?: number;
  max?: number;
  steps?: number;
} = {}) => {
  const keepValueInsideRange = useCallback(
    (value: number) => Math.min(max, Math.max(min, value)),
    [min, max]
  );
  const [current, setCurrent] = useState(keepValueInsideRange(initial));

  return {
    current,
    isCurrent: (value: number) => value === current,
    setCurrent: (nextValue: number) =>
      setCurrent(keepValueInsideRange(nextValue)),
    next: () =>
      setCurrent((value: number) => keepValueInsideRange(value + steps)),
    prev: () =>
      setCurrent((value: number) => keepValueInsideRange(value - steps)),
    hasNext: () => current < max,
    hasPrev: () => current > min,
  };
};
