import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import axios from 'axios'
import 'element-plus/dist/index.css'

const app = createApp(App);

axios.defaults.baseURL = 'http://192.168.1.8:8080/api';
app.config.globalProperties.$axios = axios

app.use(router);
app.use(ElementPlus);
app.mount('#app');
