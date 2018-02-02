import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
import { Loading } from 'element-ui'

Vue.use(VueRouter)
Vue.use(Loading.directive)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
