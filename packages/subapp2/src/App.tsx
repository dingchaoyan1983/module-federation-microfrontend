import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useRoutes, RouteObject } from 'react-router-dom';
import {
  createBridgeComponent
} from "@module-federation/bridge-react"

// 应用属性接口
interface AppProps {
  basename?: string;
  location?: any;
  params?: any;
}

/**
 * 子应用2的路由组件
 */
const AppRoutes: React.FC<AppProps> = ({ basename = '/' }) => {
  // 定义子应用内部路由
  const routes: RouteObject[] = [
    { path: '/', element: <HomePage /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/settings', element: <Settings /> },
  ];

  return (
    <>
      {/* 子应用导航 */}
      <nav className="subapp-nav">
        <NavLink to="/">子应用2首页</NavLink>
        <NavLink to="/dashboard">仪表盘</NavLink>
        <NavLink to="/settings">设置</NavLink>
      </nav>

      {/* 子应用内容 */}
      <div className="subapp-content">
        {useRoutes(routes)}
      </div>
    </>
  );
};

/**
 * 子应用2主组件
 * 支持独立运行和嵌入宿主两种模式
 */
export const App: React.FC<AppProps> = (props = {}) => {

  // 检查是否在宿主应用中运行


  // 独立运行，使用完整的 BrowserRouter
  return (
    <BrowserRouter>
      <div className="subapp-standalone">
        <h1>子应用2（独立运行模式）</h1>
        <AppRoutes {...props} />
      </div>
    </BrowserRouter>
  );
};

// 子应用页面组件
const HomePage: React.FC = () => <div>
  <h2>子应用2首页</h2>
  <p>这是子应用2的首页内容</p>
  <p>子应用2提供了仪表盘和设置功能</p>
</div>;

const Dashboard: React.FC = () => <div>
  <h2>仪表盘</h2>
  <p>这里是子应用2的仪表盘页面</p>
  <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
    <h3>关键指标</h3>
    <ul>
      <li>访问量：1,234</li>
      <li>活跃用户：456</li>
      <li>转化率：23.4%</li>
    </ul>
  </div>
</div>;

const Settings: React.FC = () => <div>
  <h2>设置</h2>
  <p>这里是子应用2的设置页面</p>
  <div style={{ marginTop: '15px' }}>
    <h3>偏好设置</h3>
    <label>
      <input type="checkbox" /> 启用通知
    </label><br />
    <label>
      <input type="checkbox" /> 自动保存
    </label><br />
    <label>
      <input type="checkbox" /> 暗色模式
    </label>
  </div>
</div>;

export default createBridgeComponent({ rootComponent: App });