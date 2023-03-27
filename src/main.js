import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store/store.js';
import { piniaStore } from './store/pinia';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.min.css';

const vuetify = createVuetify({
	components,
	directives,
	icons: {
		iconfont: 'mdi',
		defaultSet: 'mdi',
	},
});

const app = createApp(App);
app.use(piniaStore);
app.use(store);
app.use(vuetify);
app.mount('#app');
