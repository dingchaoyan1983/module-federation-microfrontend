const renderApp = async () => {
  const app = await import('./boostrap');
  app.default().render({
    dom: document.getElementById('app')!,
  });
};

renderApp();