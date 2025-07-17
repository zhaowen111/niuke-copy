import './assets/css/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Icon from './packages/Icon.vue'
import Message from './packages/message'

const app = createApp(App)
app.use(Message)
app.use(createPinia())
app.use(router)
app.component('Icon', Icon)
app.mount('#app')
