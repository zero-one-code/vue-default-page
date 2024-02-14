import vueDefaultPage from '../src';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.use(vueDefaultPage);

app.mount('#app');
