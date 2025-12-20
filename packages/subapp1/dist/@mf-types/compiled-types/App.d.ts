import React from 'react';
import "antd/dist/antd.less";
interface AppProps {
    basename?: string;
    location?: any;
    params?: any;
}
/**
 * 子应用1主组件
 * 支持独立运行和嵌入宿主两种模式
 */
export declare const App: React.FC<AppProps>;
declare const _default: () => {
    render(info: import("@module-federation/bridge-react").RenderParams): Promise<void>;
    destroy(info: import("@module-federation/bridge-react").DestroyParams): void;
};
export default _default;
