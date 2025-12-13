import { createRemoteComponent } from '@module-federation/bridge-react';
import { loadRemote, registerRemotes } from '@module-federation/enhanced/runtime';
import { AppConfig, MicroAppModule } from '../types';


registerRemotes([{
name: 'subapp1',
alias: 'subapp1',
entry: 'http://localhost:3001/remoteEntry.js',
}, {
name: 'subapp2',
alias: 'subapp2',
entry: 'http://localhost:3002/remoteEntry.js',
}]);
/**
 * 动态加载子应用模块
 * @param {AppConfig} appConfig - 子应用配置
 * @returns {Promise<MicroAppModule>} 子应用模块
 */
export const loadMicroApp = (appConfig: AppConfig) => {
  const {
    name,
    remoteUrl,
    modulePath,
  } = appConfig;

  // 创建动态 Remote 配置
  return createRemoteComponent({
    loader: () => loadRemote<any>(`${name}/${modulePath}`),
    loading: "loading...",
    fallback: () => "fallback...",
  });

};