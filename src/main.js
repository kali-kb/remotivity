
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-range-slider/dist/vue-range-slider.css'
import Slider from 'primevue/slider';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
// import RadioButton from 'primevue/radiobutton';
import PrimeVue from "primevue/config";
import Vue3Lottie from 'vue3-lottie'

import "primevue/resources/themes/arya-green/theme.css";

const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.use(Vue3Lottie)
app.component('Slider', Slider);
// app.component('RadioButton', RadioButton);
app.component('Button', Button);
app.component('Dialog', Dialog);
// app.use(RangeSlider)
app.mount('#app')



// main.js
