import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const reactRoot = createRoot(document.getElementById('root') as HTMLElement)
reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
  reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
}

// 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => {
  reactRoot.unmount();
}

// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount()
}