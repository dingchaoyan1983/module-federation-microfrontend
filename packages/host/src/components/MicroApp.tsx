import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { loadMicroApp } from '../utils/appLoader';
import { AppConfig } from '../types';

/**
 * 子应用渲染组件
 */
const MicroApp: React.FC<{ appConfig: AppConfig }> = ({ appConfig }) => {
  const [AppComponent, setAppComponent] = useState<React.LazyExoticComponent<React.ComponentType<any>>>(React.lazy(() => Promise.resolve({ default: () => null })));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const fetchApp = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const appModule  = await loadMicroApp(appConfig);
        setAppComponent(appModule);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        console.error('Error loading micro app:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [appConfig]);

  if (loading) {
    return <div className="micro-app-loader">
      <h3>加载 {appConfig.displayName} 中...</h3>
      <div className="spinner"></div>
    </div>;
  }

  if (error) {
    return <div className="micro-app-error">
      <h3>加载 {appConfig.displayName} 失败</h3>
      <p>{error.message}</p>
      <p>请确保子应用服务已启动：{appConfig.remoteUrl}</p>
    </div>;
  }

  if (!AppComponent) {
    return <div className="micro-app-empty">未找到 {appConfig.displayName} 组件</div>;
  }

  // 传递路由信息给子应用
  const appProps = {
    basename: appConfig.routePrefix,
    location,
    params,
  };

  return <div className="micro-app-container">
    <React.Suspense fallback={<div>加载中...</div>}>
      <AppComponent {...appProps} />
    </React.Suspense>
  </div>;
};

export default MicroApp;