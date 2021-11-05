import { createApp } from 'vue'
import App from './App.vue'
import router from './Routes';
import store from './store';

createApp(App).use(router).use(store).mount('#app')

