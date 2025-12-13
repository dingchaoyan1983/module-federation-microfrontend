import { createApp } from 'vue';
import App from './App.vue';
import { createBridgeComponent } from "@module-federation/bridge-vue3"
import router from './router';

export default createBridgeComponent({
    rootComponent: App,
    appOptions: () => ({
        router: router,
    }),
});

export const app = createApp(App);

app.use(router);
