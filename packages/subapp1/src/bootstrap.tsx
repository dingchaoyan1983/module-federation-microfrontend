import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


App().render({
  dom: document.getElementById('root') as HTMLElement,
});
