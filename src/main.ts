import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { piniaLoading } from '@/plugins/piniaLoading'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaLoading)
app.use(pinia)
app.use(router)

app.mount('#app')
