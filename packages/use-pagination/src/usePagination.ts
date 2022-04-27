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
  min,
  max,
}: {
  initial?: number;
  min?: number;
  max?: number;
  steps?: number;
} = {}) => {
  const keepValueInsideRange = useCallback(
    (value: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, value)),
    [min, max]
  );
  const [current, setCurrent] = useState(keepValueInsideRange(initial));

  return {
    current,
    isCurrent: (value: number) => value === current,
    setCurrent: (value: number) => setCurrent(
      Math.min(max ?? Infinity, Math.max(min ?? -Infinity, value))
    ),
    next: () =>
      setCurrent((target) => Math.min(max ?? Infinity, target + steps)),
    prev: () =>
      setCurrent((target) => Math.max(min ?? -Infinity, target - steps)),
    hasNext: () => current < (max ?? Infinity),
    hasPrev: () => current > (min ?? -Infinity),
  };
};