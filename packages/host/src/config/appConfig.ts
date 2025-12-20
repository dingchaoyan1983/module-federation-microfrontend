import { AppConfig } from '../types';

/**
 * 模拟从 API 获取子应用配置
 * 实际项目中可以替换为真实 API 调用
 */
export const fetchAppConfig = async (): Promise<AppConfig[]> => {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 返回子应用配置列表
  return [
    {
      name: 'subapp1',
      remoteUrl: 'http://localhost:3001',
      modulePath: 'App',
      routePrefix: '/subapp1',
    },
    {
      name: 'subapp2',
      remoteUrl: 'http://localhost:3002',
      modulePath: 'App',
      routePrefix: '/subapp2',
    },
    {
      name: 'vueapp',
      remoteUrl: 'http://localhost:3003',
      modulePath: 'App',
      routePrefix: '/vueapp',
    },
  ];
};