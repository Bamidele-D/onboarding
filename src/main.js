import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VOtpInput from "vue3-otp-input";
import 'remixicon/fonts/remixicon.css';
import Toaster from "@meforma/vue-toaster";

const app = createApp(App)

app.use(router)
app.use(router).use(Toaster, {
    position: "top-right",
})
app.component("v-otp-input", VOtpInput)
app.mount('#app')
