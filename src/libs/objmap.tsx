import React, {ReactElement} from 'react';

export function objMap(obj : {}, func : (x: any) => {}): Array<React.ReactElement> {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)])) as unknown as Array<React.ReactElement>;
}
