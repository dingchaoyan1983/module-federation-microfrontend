<template>
  <div id="vue-app">
    <nav class="vue-nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#vue-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.vue-nav {
  padding: 30px;
}

.vue-nav a {
  font-weight: bold;
  color: #42b983;
  margin: 0 10px;
  text-decoration: none;
}

.vue-nav a.router-link-exact-active {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}
</style>