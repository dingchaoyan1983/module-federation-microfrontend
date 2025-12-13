# Module Federation 动态加载微前端项目

## 项目简介

这是一个基于 Module Federation Bridge 实现的动态加载子应用的微前端项目，使用 pnpm monorepo 进行管理。宿主应用可以通过配置文件或API动态加载子应用，无需在Webpack配置中硬编码remote信息。

## 项目结构

```
├── packages/                  # 所有应用目录
│   ├── host/                  # 宿主应用
│   │   ├── package.json      # 依赖配置
│   │   ├── webpack.config.js # Webpack配置
│   │   ├── src/
│   │   │   ├── index.jsx     # 入口文件
│   │   │   ├── App.jsx       # 主应用组件
│   │   │   ├── config/       # 配置文件
│   │   │   │   └── appConfig.js # 应用配置（模拟API）
│   │   │   ├── utils/        # 工具函数
│   │   │   │   └── appLoader.js # 动态加载工具
│   │   │   └── components/   # 组件
│   │   │       └── MicroApp.jsx # 子应用渲染组件
│   │   └── public/
│   │       └── index.html    # HTML模板
│   ├── subapp1/              # 子应用1
│   │   ├── package.json
│   │   ├── webpack.config.js
│   │   ├── src/
│   │   │   ├── index.jsx
│   │   │   └── App.jsx
│   │   └── public/
│   │       └── index.html
│   └── subapp2/              # 子应用2
│       ├── package.json
│       ├── webpack.config.js
│       ├── src/
│       │   ├── index.jsx
│       │   └── App.jsx
│       └── public/
│           └── index.html
├── package.json               # 根目录配置
└── pnpm-workspace.yaml        # pnpm工作区配置
```

## 核心功能

1. **动态加载子应用**：宿主应用通过配置文件动态加载子应用，无需硬编码Webpack remotes
2. **路由集成**：子应用路由与宿主路由无缝集成，支持嵌套路由
3. **独立/嵌入模式**：子应用支持独立运行和嵌入宿主两种模式
4. **加载状态管理**：支持子应用加载中、加载失败等状态显示
5. **错误处理**：完善的错误捕获和处理机制

## 技术栈

- **React 18**：前端框架
- **React Router 6**：路由管理
- **Webpack 5**：打包工具
- **Module Federation**：微前端模块共享
- **@module-federation/enhanced**：增强的Module Federation功能

## 运行项目

### 1. 安装依赖

使用 pnpm 安装所有依赖（需要先安装 pnpm：`npm install -g pnpm`）：

```bash
# 根目录安装所有依赖
pnpm install
```

### 2. 启动项目

可以分别启动各个应用，也可以使用根目录的脚本同时启动所有应用：

```bash
# 分别启动应用
pnpm --filter host start       # 启动宿主应用（3000端口）
pnpm --filter subapp1 start    # 启动子应用1（3001端口）
pnpm --filter subapp2 start    # 启动子应用2（3002端口）

# 同时启动所有应用（推荐）
pnpm start:all
```

### 3. 构建项目

```bash
# 分别构建应用
pnpm --filter host build       # 构建宿主应用
pnpm --filter subapp1 build    # 构建子应用1
pnpm --filter subapp2 build    # 构建子应用2

# 同时构建所有应用
pnpm build:all
```

### 2. 启动子应用

在不同的终端窗口中启动子应用：

```bash
# 子应用1 (端口 3001)
cd subapp1
npm start

# 子应用2 (端口 3002)
cd subapp2
npm start
```

### 3. 启动宿主应用

```bash
# 宿主应用 (端口 3000)
cd host
npm start
```

### 4. 访问应用

- 宿主应用：http://localhost:3000
- 子应用1独立运行：http://localhost:3001
- 子应用2独立运行：http://localhost:3002

## 关键实现说明

### 1. 动态加载机制

宿主应用通过 `src/utils/appLoader.js` 中的 `loadMicroApp` 函数动态加载子应用：

```javascript
import { createDynamicRemote } from '@module-federation/bridge-react';

export const loadMicroApp = async (appConfig) => {
  const { name, remoteUrl, modulePath } = appConfig;
  
  // 创建动态Remote
  const dynamicRemote = createDynamicRemote({
    name,
    url: remoteUrl,
  });
  
  // 加载远程模块
  const RemoteModule = await dynamicRemote.loadComponent(modulePath);
  
  return RemoteModule;
};
```

### 2. 配置管理

宿主应用通过 `src/config/appConfig.js` 模拟从API获取子应用配置：

```javascript
export const fetchAppConfig = async () => {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 返回子应用配置列表
  return [
    {
      name: 'subapp1',
      remoteUrl: 'http://localhost:3001/remoteEntry.js',
      modulePath: './App',
      routePrefix: '/subapp1',
      displayName: '子应用1'
    },
    {
      name: 'subapp2',
      remoteUrl: 'http://localhost:3002/remoteEntry.js',
      modulePath: './App',
      routePrefix: '/subapp2',
      displayName: '子应用2'
    }
  ];
};
```

### 3. 子应用渲染

通过 `src/components/MicroApp.jsx` 组件渲染子应用，并处理加载状态和错误：

```javascript
import React, { useEffect, useState } from 'react';
import { loadMicroApp } from '../utils/appLoader';

const MicroApp = ({ appConfig }) => {
  const [AppComponent, setAppComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchApp = async () => {
      try {
        setLoading(true);
        setError(null);
        const component = await loadMicroApp(appConfig);
        setAppComponent(component);
      } catch (err) {
        setError(err.message || '加载子应用失败');
        console.error('加载子应用失败:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApp();
  }, [appConfig]);
  
  if (loading) {
    return <div className="loading">加载子应用中...</div>;
  }
  
  if (error) {
    return <div className="error">加载失败: {error}</div>;
  }
  
  if (!AppComponent) {
    return <div className="error">子应用组件不存在</div>;
  }
  
  return <AppComponent basename={appConfig.routePrefix} />;
};

export default MicroApp;
```

### 4. 路由集成

宿主应用在 `src/App.jsx` 中动态配置路由：

```javascript
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { fetchAppConfig } from './config/appConfig';
import MicroApp from './components/MicroApp';

const App = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadApps = async () => {
      try {
        setLoading(true);
        const appConfigs = await fetchAppConfig();
        setApps(appConfigs);
      } catch (err) {
        setError(err.message || '加载应用配置失败');
        console.error('加载应用配置失败:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadApps();
  }, []);
  
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>Module Federation 动态加载微前端</h1>
        </header>
        
        <nav>
          <Link to="/">首页</Link>
          <Link to="/about">关于</Link>
          {apps.map(app => (
            <Link key={app.name} to={app.routePrefix}>
              {app.displayName}
            </Link>
          ))}
        </nav>
        
        <main>
          {loading ? (
            <div className="loading">加载应用配置中...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* 动态生成子应用路由 */}
              {apps.map(app => (
                <Route
                  key={app.name}
                  path={`${app.routePrefix}/*`}
                  element={<MicroApp appConfig={app} />}
                />
              ))}
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
};
```

## 扩展建议

1. **API集成**：将 `appConfig.js` 替换为真实的API调用
2. **错误处理**：增强错误处理和重试机制
3. **加载状态**：添加更丰富的加载动画
4. **子应用间通信**：实现子应用间的数据共享机制
5. **权限控制**：在动态加载时添加权限检查
6. **性能优化**：实现子应用的预加载和缓存

## 注意事项

1. 确保子应用的 `publicPath` 配置正确，指向可访问的URL
2. 共享依赖版本需要兼容
3. 子应用需要支持 `basename` 属性来处理路由前缀
4. 跨域问题需要在子应用的Webpack配置中设置 `headers: { 'Access-Control-Allow-Origin': '*' }`

## 参考资料

- [Module Federation 官方文档](https://module-federation.io/)
- [React Router 官方文档](https://reactrouter.com/)
- [Webpack Module Federation 文档](https://webpack.js.org/concepts/module-federation/)