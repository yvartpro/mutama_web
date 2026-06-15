import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import scrollAnimate from './plugins/scrollAnimate.js'
import './styles/aos.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(scrollAnimate)

app.mount('#app')
