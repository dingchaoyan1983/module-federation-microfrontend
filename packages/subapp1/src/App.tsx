import React from 'react';
import {
  createBridgeComponent
} from "@module-federation/bridge-react"
import {
  BrowserRouter,
  Routes, Route, NavLink, useRoutes, RouteObject,
  useLocation
} from 'react-router-dom';
import Subapp1Component from './Subapp1Component';
import "antd/dist/antd.less";
import { Button } from 'antd';

// 应用属性接口
interface AppProps {
  basename?: string;
  location?: any;
  params?: any;
}

/**
 * 子应用1的路由组件
 */
const AppRoutes: React.FC<AppProps> = () => {
  // 定义子应用内部路由
  const routes: RouteObject[] = [
    { path: '/', element: <HomePage /> },
    { path: '/page1', element: <Page1 /> },
    { path: '/page2', element: <Page2 /> },
  ];

  return (
    <>
      {/* 子应用导航 */}
      <nav className="subapp-nav">
        <NavLink to="/">子应用1首页</NavLink>
        <NavLink to="/page1">页面1</NavLink>
        <NavLink to="/page2">页面2</NavLink>
      </nav>

      {/* 子应用内容 */}
      <div className="subapp-content">
        <Button type="primary">子应用1按钮</Button>
        {useRoutes(routes)}
      </div>
    </>
  );
};

/**
 * 子应用1主组件
 * 支持独立运行和嵌入宿主两种模式
 */
export const App: React.FC<AppProps> = (props = {}) => {


  // 独立运行，使用完整的 BrowserRouter
  return (
    <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || '/'}>
      <div className="subapp-standalone">
        <h1>子应用1（独立运行模式）</h1>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

// 子应用页面组件
const HomePage: React.FC = () => <div>
  <h2>子应用1首页</h2>
  <p>这是子应用1的首页内容</p>
  <Subapp1Component useLocation={useLocation} />
</div>;

const Page1: React.FC = () => <div>
  <h2>页面1</h2>
  <p>这是子应用1的页面1内容</p>
  <p>可以在这里展示子应用的具体功能</p>
</div>;

const Page2: React.FC = () => <div>
  <h2>页面2</h2>
  <p>这是子应用1的页面2内容</p>
  <p>子应用内部支持完整的路由系统</p>
</div>;

export default createBridgeComponent({
  rootComponent: App
});
