import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";
import router from './Router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//定时器
// @ts-ignore
import auto_loginout from './utils/auto_loginout.js'

const app = createApp(App);


app.config.globalProperties.$axios = axios;
app.use(ElementPlus).use(router).use(auto_loginout).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}