import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VOtpInput from "vue3-otp-input";

const app = createApp(App)

app.use(router)
app.component("v-otp-input", VOtpInput)
app.mount('#app')
