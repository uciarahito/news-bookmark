// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Navbar from './components/Navbar'
import router from './router'
import VueFire from 'vuefire'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(require('vue-resource'));
Vue.use(VueFire)
Vue.use(VueAxios, axios)

Vue.component('navbar', Navbar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})