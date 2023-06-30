import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';

/* Default VUE */
import './assets/style/css/base.css'

/* PrimeVue */
// import "primevue/resources/themes/viva-light/theme.css";     
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';
import './assets/style/css/theme.css';

/* jQuery */
import $ from "jquery";
window.$ = $;

/* Função Base */
import "./assets/script/default.js";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.mount('#app');
export default app;

