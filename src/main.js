import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//axios
import axios from "./axiosTool";
Vue.prototype.$http = axios;

new Vue({
  render: h => h(App),
}).$mount('#app')
