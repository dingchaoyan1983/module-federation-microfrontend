<template>
  <div class="about">
    <h1>关于我们</h1>
    <p>这是一个使用Vue 3和TypeScript构建的示例应用</p>
    
    <div class="features">
      <h2>特性</h2>
      <ul>
        <li v-for="feature in features" :key="feature.id">
          <strong>{{ feature.name }}</strong>: {{ feature.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// 定义特性接口
interface Feature {
  id: number;
  name: string;
  description: string;
}

export default defineComponent({
  name: 'About',
  setup() {
    const features = ref<Feature[]>([
      {
        id: 1,
        name: 'Vue 3',
        description: '使用最新的Vue 3 Composition API',
      },
      {
        id: 2,
        name: 'TypeScript',
        description: '提供类型安全和更好的开发体验',
      },
      {
        id: 3,
        name: '响应式设计',
        description: '适配不同设备和屏幕尺寸',
      },
    ]);
    
    return {
      features,
    };
  },
});
</script>

<style scoped>
.about {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.features {
  margin-top: 20px;
  text-align: left;
}

.features ul {
  list-style-type: none;
  padding: 0;
}

.features li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
</style>