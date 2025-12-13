// 应用配置类型
export interface AppConfig {
  name: string;
  remoteUrl: string;
  modulePath: string;
  routePrefix: string;
  displayName: string;
}

// 子应用组件属性类型
export interface MicroAppProps {
  appConfig: AppConfig;
}

// 子应用模块类型
export interface MicroAppModule {
  default?: React.ComponentType<any>;
  [key: string]: any;
}

// 动态远程配置类型
export interface DynamicRemoteConfig {
  name: string;
  url: string;
  scope: string;
  module: string;
}