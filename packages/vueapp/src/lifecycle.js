import { createApp } from 'vue';
import App from './App.vue';

let vueAppInstance = null;

// 创建Vue应用实例
const createVueApp = (container) => {
  if (vueAppInstance) {
    vueAppInstance.unmount();
  }
  
  vueAppInstance = createApp(App);
  vueAppInstance.mount(container);
  
  return vueAppInstance;
};

// 卸载Vue应用实例
const unmountVueApp = () => {
  if (vueAppInstance) {
    vueAppInstance.unmount();
    vueAppInstance = null;
  }
};

// 导出Vue应用的生命周期方法
export const bootstrap = async () => {
  console.log('Vue3 app bootstrap');
};

export const mount = async (props) => {
  console.log('Vue3 app mount with props:', props);
  const { container } = props;
  createVueApp(container);
};

export const unmount = async () => {
  console.log('Vue3 app unmount');
  unmountVueApp();
};