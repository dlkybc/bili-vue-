import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@/assets/css/reset.css'
import MyHttpServer from '@/plugins/http.js'

//回顾axios
// import axios from 'axios'
// Vue.prototype.$http=axios
//Vue.use()是vue插件的用法  axios不是vue插件
Vue.config.productionTip = false
Vue.use(ElementUI, Vuex);
//Vue.use(ElementUI, Vuex, MyHttpServer);  这样写MyHttpServer不生效 需要单独写一个use()
Vue.use(MyHttpServer);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
