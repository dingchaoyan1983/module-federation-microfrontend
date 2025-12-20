<template>
  <div class="about">
    <h1>关于Vue3子应用</h1>
    <p>这是一个演示如何使用Module Federation与React Host应用集成的Vue3子应用</p>
    
    <div class="info-card">
      <h2>技术栈</h2>
      <div class="tech-stack">
        <div class="tech-item">
          <h3>Vue 3</h3>
          <p>使用最新的Vue3框架和Composition API</p>
        </div>
        <div class="tech-item">
          <h3>Vue Router 4</h3>
          <p>使用Vue Router 4进行路由管理</p>
        </div>
        <div class="tech-item">
          <h3>Module Federation</h3>
          <p>使用Webpack 5的Module Federation实现微前端架构</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
.about {
  padding: 20px;
}

.info-card {
  margin-top: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
}

.tech-item {
  width: 250px;
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tech-item h3 {
  color: #42b983;
  margin-top: 0;
}
</style>