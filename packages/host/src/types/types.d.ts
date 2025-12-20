declare module '*.module.less' {
 const classes: { [key: string]: string };
 export default classes;
}

declare module '*.less' {
 const classes: { [key: string]: string };
 export default classes;
}

declare namespace JSX {
  interface IntrinsicElements {
    'micro-app': any;
  }
}