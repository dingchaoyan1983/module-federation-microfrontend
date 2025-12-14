
import React from 'react';
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
export const loadMicroApp = async (appConfig: AppConfig) => {
  const {
    name,
    remoteUrl,
    modulePath,
  } = appConfig;


  // @ts-ignore ignore
  const Comp = React.lazy(async () => {
    //@ts-ignore
    const remoteModule = await loadRemote(`${name}/${modulePath}`);
    console.log(remoteModule);
    return remoteModule;
  });

  return Comp
};