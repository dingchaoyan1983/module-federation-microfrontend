import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { fetchAppConfig } from './config/appConfig';
import MicroApp from './components/MicroApp';
import { AppConfig } from './types';
import { registerRemotes } from '@module-federation/enhanced/runtime';

const App: React.FC = () => {
  const [appList, setAppList] = useState<AppConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 加载子应用配置
    const loadAppConfig = async () => {
      const config = await fetchAppConfig();
      setAppList(config);
      registerRemotes(config.map((conf) => ({
        name: conf.name,
        alias: conf.name,
        entry: conf.remoteUrl,
      })));
      setLoading(false);
    };

    loadAppConfig();
  }, []);

  if (loading) {
    return <div className="host-app-loader">加载应用配置中...</div>;
  }

  return (
    <BrowserRouter>
      <div className="host-app">
        {/* 宿主应用导航 */}
        <nav className="host-nav">
          <NavLink to="/">首页</NavLink>
          <NavLink to="/about">关于</NavLink>

          {/* 动态生成子应用导航 */}
          {appList.map(app => (
            <NavLink key={app.name} to={app.routePrefix}>
              {app.name}
            </NavLink>
          ))}
        </nav>

        {/* 路由配置 */}
        <main className="host-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* 动态生成子应用路由 */}
            {appList.map(app => (
              <Route
                key={app.name}
                path={`${app.routePrefix}/*`}
                element={<MicroApp appConfig={app} />}
              />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

// 宿主应用页面组件
const HomePage: React.FC = () => <div>
  <h1>欢迎来到宿主应用</h1>
  <p>这是一个基于 Module Federation 的微前端宿主应用</p>
  <p>通过顶部导航可以访问各个子应用</p>
</div>;

const AboutPage: React.FC = () => <div>
  <h1>关于我们</h1>
  <p>这是一个演示如何使用 Module Federation Bridge 动态加载子应用的示例</p>
  <p>支持通过配置文件动态管理子应用的加载</p>
</div>;

export default App;