/**
 * Copyright (c) Open Formation GmbH.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * @author Wilhelm Behncke <wilhelm.behncke@openformation.io>
 */

import * as React from "react";

export const useBusiness = () => {
  const [processes, setProcesses] = React.useState(new Set());
  const mounted = React.useRef(true);

  const perform = React.useCallback(
    <R>(processFn: () => Promise<R>) => {
      const process = processFn().finally(() => {
        if (mounted.current) {
          setProcesses((processes) => {
            const nextProcesses = new Set([...processes]);
            nextProcesses.delete(process);
            return nextProcesses;
          });
        }
      });

      setProcesses((processes) => new Set([...processes, process]));

      return process;
    },
    [setProcesses],
  );

  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  });

  return Object.freeze({
    isBusy: processes.size > 0,
    perform,
  });
};
