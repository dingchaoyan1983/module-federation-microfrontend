import React, { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { loadMicroApp } from '../utils/appLoader';
import { AppConfig } from '../types';

/**
 * 子应用渲染组件
 */
const MicroApp: React.FC<{ appConfig: AppConfig }> = ({ appConfig }) => {
  const AppComponent = useMemo(() => loadMicroApp(appConfig), [appConfig]);
  const location = useLocation();
  const params = useParams();

  if (!AppComponent) {
    return <div className="micro-app-empty">未找到 {appConfig.name} 组件</div>;
  }

  // 传递路由信息给子应用
  const appProps = {
    basename: appConfig.routePrefix,
    location,
    params,
  };

  return (
    <div className="micro-app-container">
      <AppComponent {...appProps} />
    </div>
  );
};

export default MicroApp;