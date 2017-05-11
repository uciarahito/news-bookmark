// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
// import VueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false

// Vue.use(VueResource)
Vue.use(require('vue-resource'));
Vue.use(VueFire)
Vue.use(VueAxios, axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
