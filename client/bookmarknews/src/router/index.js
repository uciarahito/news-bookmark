import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SourceSelection from '@/components/SourceSelection'
import Newlist from '@/components/Newlist'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/sourceselection',
      name: 'SourceSelection',
      component: SourceSelection
    },
    {
      path: '/newlist',
      name: 'Newlist',
      component: Newlist
    }
  ]
})