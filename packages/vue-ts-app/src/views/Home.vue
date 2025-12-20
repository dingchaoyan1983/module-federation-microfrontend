<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    
    <div class="user-info">
      <h2>用户信息</h2>
      <p>姓名: {{ user.name }}</p>
      <p>年龄: {{ user.age }}</p>
      <p>邮箱: {{ user.email }}</p>
    </div>
    
    <div class="todo-list">
      <h2>待办事项</h2>
      <ul>
        <li v-for="item in todos" :key="item.id">
          {{ item.title }}
          <button @click="toggleTodo(item.id)">
            {{ item.completed ? '未完成' : '已完成' }}
          </button>
        </li>
      </ul>
      <div class="add-todo">
        <input 
          v-model="newTodo" 
          @keyup.enter="addTodo" 
          placeholder="添加新待办事项"
        />
        <button @click="addTodo">添加</button>
      </div>
    </div>
    
    <!-- 引入TypeScript类型检查示例组件 -->
    <TypedComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import TypedComponent from '@/components/TypedComponent.vue';

// 定义用户接口
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

// 定义待办事项接口
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default defineComponent({
  name: 'Home',
  components: {
    TypedComponent,
  },
  setup() {
    // 响应式数据
    const title = ref<string>('Vue 3 + TypeScript 示例应用');
    const description = ref<string>('这是一个使用Vue 3和TypeScript构建的示例应用');
    
    // 用户信息
    const user = reactive<User>({
      id: 1,
      name: '张三',
      age: 30,
      email: 'zhangsan@example.com',
    });
    
    // 待办事项列表
    const todos = ref<Todo[]>([
      { id: 1, title: '学习Vue 3', completed: true },
      { id: 2, title: '学习TypeScript', completed: false },
      { id: 3, title: '创建微前端应用', completed: false },
    ]);
    
    // 新待办事项
    const newTodo = ref<string>('');
    
    // 添加待办事项
    const addTodo = (): void => {
      if (newTodo.value.trim()) {
        const newId = Math.max(...todos.value.map((t: Todo) => t.id)) + 1;
        todos.value.push({
          id: newId,
          title: newTodo.value,
          completed: false,
        });
        newTodo.value = '';
      }
    };
    
    // 切换待办事项状态
    const toggleTodo = (id: number): void => {
      const todo = todos.value.find((t: Todo) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    };
    
    return {
      title,
      description,
      user,
      todos,
      newTodo,
      addTodo,
      toggleTodo,
    };
  },
});
</script>

<style scoped>
.home {
  padding: 20px;
}

.user-info, .todo-list {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  text-align: left;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.todo-list ul {
  list-style-type: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.add-todo {
  display: flex;
  margin-top: 15px;
}

.add-todo input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
}

button {
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>