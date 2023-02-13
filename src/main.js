import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store/store.js';
import { piniaStore } from './store/pinia';

const app = createApp(App);
app.use(piniaStore);
app.use(store);
app.mount('#app');
