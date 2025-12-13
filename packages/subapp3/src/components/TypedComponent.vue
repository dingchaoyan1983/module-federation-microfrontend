<template>
  <div class="typed-component">
    <h2>{{ componentTitle }}</h2>
    
    <div class="user-form">
      <h3>用户表单</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">姓名:</label>
          <input 
            id="name"
            v-model="formData.name" 
            type="text" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="age">年龄:</label>
          <input 
            id="age"
            v-model.number="formData.age" 
            type="number" 
            min="1"
            max="120"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="email">邮箱:</label>
          <input 
            id="email"
            v-model="formData.email" 
            type="email" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="role">角色:</label>
          <select id="role" v-model="formData.role" required>
            <option 
              v-for="role in userRoles" 
              :key="role.value" 
              :value="role.value"
            >
              {{ role.label }}
            </option>
          </select>
        </div>
        
        <button type="submit">提交</button>
      </form>
    </div>
    
    <div v-if="submittedUser" class="submitted-data">
      <h3>提交的用户数据</h3>
      <p><strong>姓名:</strong> {{ submittedUser.name }}</p>
      <p><strong>年龄:</strong> {{ submittedUser.age }}</p>
      <p><strong>邮箱:</strong> {{ submittedUser.email }}</p>
      <p><strong>角色:</strong> {{ getRoleLabel(submittedUser.role) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

// 定义用户角色枚举
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

// 定义用户角色标签映射
const roleLabels: Record<UserRole, string> = {
  [UserRole.Admin]: '管理员',
  [UserRole.User]: '普通用户',
  [UserRole.Guest]: '访客',
};

// 定义用户接口
interface User {
  name: string;
  age: number;
  email: string;
  role: UserRole;
}

// 定义表单数据接口
interface FormData {
  name: string;
  age: number | null;
  email: string;
  role: UserRole;
}

// 定义角色选项接口
interface RoleOption {
  value: UserRole;
  label: string;
}

export default defineComponent({
  name: 'TypedComponent',
  setup() {
    const componentTitle = ref<string>('TypeScript 类型检查示例组件');
    
    // 表单数据
    const formData = reactive<FormData>({
      name: '',
      age: null,
      email: '',
      role: UserRole.User,
    });
    
    // 用户角色选项
    const userRoles = ref<RoleOption[]>([
      { value: UserRole.Admin, label: roleLabels[UserRole.Admin] },
      { value: UserRole.User, label: roleLabels[UserRole.User] },
      { value: UserRole.Guest, label: roleLabels[UserRole.Guest] },
    ]);
    
    // 提交的用户数据
    const submittedUser = ref<User | null>(null);
    
    // 获取角色标签
    const getRoleLabel = (role: UserRole): string => {
      return roleLabels[role];
    };
    
    // 提交表单
    const submitForm = (): void => {
      // 验证表单
      if (!formData.name || !formData.age || !formData.email) {
        alert('请填写完整的用户信息');
        return;
      }
      
      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('请输入有效的邮箱地址');
        return;
      }
      
      // 创建用户对象
      const user: User = {
        name: formData.name,
        age: formData.age,
        email: formData.email,
        role: formData.role,
      };
      
      // 设置提交的用户数据
      submittedUser.value = user;
      
      // 重置表单
      formData.name = '';
      formData.age = null;
      formData.email = '';
      formData.role = UserRole.User;
    };
    
    return {
      componentTitle,
      formData,
      userRoles,
      submittedUser,
      getRoleLabel,
      submitForm,
    };
  },
});
</script>

<style scoped>
.typed-component {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.user-form {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.submitted-data {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>