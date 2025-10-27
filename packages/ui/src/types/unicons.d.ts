declare module '@iconscout/react-unicons' {
  import * as React from 'react';
  export type UniconProps = React.SVGAttributes<SVGSVGElement> & {
    size?: number | string;
    color?: string;
    title?: string;
  };
  export const UilSearch: React.FC<UniconProps>;
  export const UilAngleRight: React.FC<UniconProps>;
  export const UilAngleDown: React.FC<UniconProps>;
  export const UilAngleUp: React.FC<UniconProps>;
  export const UilLocationPoint: React.FC<UniconProps>;
  export const UilMoneyBill: React.FC<UniconProps>;
  export const UilArrowLeft: React.FC<UniconProps>;
  export const UilUpload: React.FC<UniconProps>;
  export const UilEye: React.FC<UniconProps>;
  export const UilEyeSlash: React.FC<UniconProps>;
  // Add more icons here as needed; untyped icons will still work at runtime.
}