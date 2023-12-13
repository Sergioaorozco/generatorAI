import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Skeleton from 'primevue/skeleton';
import ProgressSpinner from 'primevue/progressspinner';
import 'primevue/resources/themes/lara-light-green/theme.css'


const app = createApp(App)
app.use(PrimeVue)
app.component('Skeleton', Skeleton);
app.component('ProgressSpinner', ProgressSpinner);
app.mount('#app')
