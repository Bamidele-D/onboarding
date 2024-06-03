import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VOtpInput from "vue3-otp-input";
import 'remixicon/fonts/remixicon.css';
import Toaster from "@meforma/vue-toaster";
import KrediAuth from './KrediAuth';

const app = createApp(App)

app.use(KrediAuth)
app.use(Toaster, {
    position: "top-right",
})
app.component("v-otp-input", VOtpInput)
app.mount('#app')
