declare module '@iconscout/react-unicons' {
  import * as React from 'react';
  export type UniconProps = React.SVGAttributes<SVGSVGElement> & {
    size?: number | string;
    color?: string;
    title?: string;
  };
  export const UilSearch: React.FC<UniconProps>;
  // Add more icons here as needed; untyped icons will still work at runtime.
}