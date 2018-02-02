import VueRouter from 'vue-router'
import Groups from './Groups'
import Logs from './Logs'
import Streams from './Streams'

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Groups },
    { path: '/streams', component: Streams },
    { path: '/logs', component: Logs },
  ]
})
