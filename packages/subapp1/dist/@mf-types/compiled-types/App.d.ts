import React from 'react';
declare global {
    interface Window {
        __POWERED_BY_QIANKUN__?: boolean;
    }
}
interface AppProps {
    basename?: string;
    location?: any;
    params?: any;
}
/**
 * 子应用1主组件
 * 支持独立运行和嵌入宿主两种模式
 */
declare const App: React.FC<AppProps>;
export default App;
