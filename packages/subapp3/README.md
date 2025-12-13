# Vue 3 + TypeScript 示例应用

这是一个基于Vue 3和TypeScript构建的示例应用，展示了如何正确配置TypeScript环境以及如何在Vue组件中使用TypeScript类型定义。

## 项目结构

```
vue-ts-app/
├── public/
│   └── index.html              # HTML模板
├── src/
│   ├── assets/                 # 静态资源
│   ├── components/              # 组件
│   │   └── TypedComponent.vue  # TypeScript类型检查示例组件
│   ├── types/                   # 类型定义
│   │   └── vue-shim.d.ts       # Vue类型声明
│   ├── views/                   # 页面
│   │   ├── About.vue           # 关于页面
│   │   └── Home.vue            # 首页
│   ├── router/
│   │   └── index.ts            # 路由配置
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 应用入口
├── package.json                # 项目依赖
├── tsconfig.json               # TypeScript配置
├── webpack.config.js           # Webpack配置
├── .babelrc                    # Babel配置
└── README.md                   # 项目说明
```

## 技术栈

- Vue 3
- TypeScript
- Vue Router 4
- Webpack 5
- Babel

## 安装和运行

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 构建生产版本：
   ```bash
   npm run build
   ```

## TypeScript特性

### 1. 接口定义

在项目中定义了多个接口，如`User`、`Todo`、`Feature`等，用于类型检查：

```typescript
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}
```

### 2. 枚举类型

使用枚举定义用户角色：

```typescript
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}
```

### 3. 组件Props类型

在Vue组件中使用TypeScript定义props和响应式数据的类型：

```typescript
const formData = reactive<FormData>({
  name: '',
  age: null,
  email: '',
  role: UserRole.User,
});
```

### 4. 函数参数和返回值类型

为函数参数和返回值添加类型注解：

```typescript
const toggleTodo = (id: number): void => {
  const todo = todos.value.find((t: Todo) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
```

## 开发指南

1. 组件文件使用`.vue`扩展名，并在`<script>`标签中添加`lang="ts"`属性
2. 使用Vue 3的Composition API和TypeScript结合开发
3. 为所有数据、函数参数和返回值添加类型注解
4. 使用接口定义复杂的数据结构
5. 使用枚举定义常量集合

## 注意事项

1. 确保安装了`@types/node`以获取Node.js的类型定义
2. 在`tsconfig.json`中配置了`@`别名指向`src`目录
3. 使用`vue-shim.d.ts`文件声明`.vue`模块的类型
4. Webpack配置中添加了对`.ts`和`.tsx`文件的处理规则

这个示例应用展示了如何在Vue 3项目中正确使用TypeScript，包括类型定义、类型检查和类型推导等功能。