import KrediAuth from "./components/KrediAuth.vue";
import "./index.css"

export default {
    install: (app, options) => {
        app.component("KrediAuth", KrediAuth);
    }
}

export { KrediAuth };