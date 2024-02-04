import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'
import App from './App.vue'
const pinia = createPinia()
const app = createApp(App)
app.use(VueAxios, axios)
app.use(pinia)
app.mount('#app')
