declare module '@iconscout/react-unicons' {
  import * as React from 'react';
  export type UniconProps = React.SVGAttributes<SVGSVGElement> & {
    size?: number | string;
    color?: string;
    title?: string;
  };
  // Commonly used icons — extend as needed
  export const UilSearch: React.FC<UniconProps>;
}