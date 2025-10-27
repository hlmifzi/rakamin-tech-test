declare module '*.svg' {
  const content: string | { src: string } | { default: { src: string } };
  export default content;
}