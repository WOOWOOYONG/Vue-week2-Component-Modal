import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ModalItem from './components/ModalItem.vue'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.component('ModalItem', ModalItem)
app.mount('#app')
