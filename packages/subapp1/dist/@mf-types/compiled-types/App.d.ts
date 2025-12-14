declare global {
    interface Window {
        __POWERED_BY_QIANKUN__?: boolean;
    }
}
declare const _default: () => {
    render(info: import("@module-federation/bridge-react").RenderFnParams & {
        [key: string]: unknown;
    }): Promise<void>;
    destroy(info: {
        moduleName: string;
        dom: HTMLElement;
    }): void;
};
export default _default;
