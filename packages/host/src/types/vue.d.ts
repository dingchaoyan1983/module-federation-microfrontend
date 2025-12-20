declare module 'vueApp/lifecycle' {
  export function bootstrap(): Promise<void>;
  export function mount(props: { container: HTMLElement }): Promise<void>;
  export function unmount(): Promise<void>;
}