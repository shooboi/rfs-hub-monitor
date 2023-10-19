import { createApp } from 'vue'
import App from './App.vue'
import router from './router.vue'
import './index.css'
import axios from 'axios';
import highchartsVue from 'highcharts-vue';
import store from "./stores";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faChartBar, faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faChartBar, faAngleDoubleDown, faAngleDoubleUp)

const app = createApp(App);
app.use(highchartsVue);
app.config.globalProperties.$http = axios;
app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
