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
      remoteUrl: 'http://localhost:3001/subapp1-manifest.json',
      modulePath: 'App',
      routePrefix: '/subapp1',
    },
    {
      name: 'subapp2',
      remoteUrl: 'http://localhost:3002/subapp2-manifest.json',
      modulePath: 'App',
      routePrefix: '/subapp2',
    },
  ];
};