import * as React from "react";

export type IconProps = {
  size?: number | string;
  className?: string;
  title?: string;
};

// Colored Google "G" logo (multi-color)
// Colors: #4285F4 (Blue), #34A853 (Green), #FBBC05 (Yellow), #EA4335 (Red)
export const IconGoogle: React.FC<IconProps> = ({ size = 20, className, title }) => {
  const px = typeof size === "number" ? size : undefined;
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      {/* This path set approximates the official Google G */}
      <path fill="#4285F4" d="M21.35 11.1H12v2.97h5.33c-.23 1.48-1.61 4.34-5.33 4.34-3.22 0-5.86-2.67-5.86-5.95S8.78 6.51 12 6.51c1.84 0 3.08.78 3.79 1.45l2.58-2.5C16.94 4.23 14.8 3.28 12.78 3.28 8.47 3.28 5.1 6.67 5.1 11s3.37 7.7 7.68 7.7c4.44 0 7.55-3.12 7.55-7.51 0-.51-.06-1.02-.18-2.09Z"/>
      <path fill="#34A853" d="M12.78 20.7c2.47 0 4.54-.82 6.05-2.23l-2.88-2.24c-.78.53-1.78.85-3.17.85-2.43 0-4.49-1.64-5.23-3.86H6.58v2.42c1.5 2.96 4.6 5.06 8 5.06Z"/>
      <path fill="#FBBC05" d="M7.55 13.22c-.18-.55-.28-1.14-.28-1.76 0-.61.1-1.2.28-1.76V7.28H6.57C5.95 8.53 5.6 9.73 5.6 11s.35 2.47.97 3.72l.98-1.5Z"/>
      <path fill="#EA4335" d="M12.78 6.43c1.34 0 2.54.46 3.49 1.36l2.58-2.5c-1.51-1.4-3.58-2.26-6.07-2.26-3.4 0-6.5 2.1-8 5.06l.98 1.5c.74-2.22 2.8-3.86 5.23-3.86Z"/>
    </svg>
  );
};

export default IconGoogle;