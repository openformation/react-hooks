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

import { useMemo } from "react";

export const useService = <S, D extends Record<string, any>>(
  serviceFactoryFn: (deps: D) => S,
  deps: D
) => useMemo(() => serviceFactoryFn(deps), Object.values(deps));
