declare const _default: () => {
    __APP_VERSION__: string;
    render(info: import("@module-federation/bridge-vue3").RenderFnParams): Promise<void>;
    destroy(info: {
        dom: HTMLElement;
    }): void;
};
export default _default;
export declare const app: import("vue").App<Element>;
