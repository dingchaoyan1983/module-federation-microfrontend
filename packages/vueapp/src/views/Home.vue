<template>
  <div class="home">
    <h1>欢迎来到Vue3子应用</h1>
    <p>这是一个基于Vue3和Module Federation的微前端子应用</p>
    <div class="feature-list">
      <h2>特性</h2>
      <ul>
        <li>Vue3 Composition API</li>
        <li>Vue Router 4</li>
        <li>Module Federation</li>
        <li>与React Host应用集成</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.feature-list {
  margin-top: 30px;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-left: 4px solid #42b983;
}
</style>