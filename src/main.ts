import {createApp} from 'vue'
import App from './App.vue'
import Skeleton from '@x-ui-vue3/skeleton'
import 'bootstrap/dist/css/bootstrap.css'
import {createPinia} from 'pinia'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(Skeleton)
app.mount('#app')