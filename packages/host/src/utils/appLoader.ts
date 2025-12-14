
import { createRemoteComponent } from "@module-federation/bridge-react"
import { loadRemote } from '@module-federation/enhanced/runtime';
import { AppConfig } from '../types';

/**
 * 动态加载子应用模块
 * @param {AppConfig} appConfig - 子应用配置
 * @returns {Promise<MicroAppModule>} 子应用模块
 */
export const loadMicroApp = async (appConfig: AppConfig) => {
  const {
    name,
    remoteUrl,
    modulePath,
  } = appConfig;

  const RemoteComponent = createRemoteComponent({
    loader: () => loadRemote<any>(`${name}/${modulePath}`),
    loading: "loading",
    fallback: () => null,
  })

  return RemoteComponent;
};