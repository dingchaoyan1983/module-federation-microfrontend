const renderApp = async () => {
  const app = await import('./boostrap');
  app.default.mount('#app');
};

renderApp();