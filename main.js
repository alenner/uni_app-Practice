import Vue from 'vue'
import App from './App'
import { myRequest } from 'util/api.js'
import 'taro-ui/dist/style/index.scss'

Vue.prototype.$myRequest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
