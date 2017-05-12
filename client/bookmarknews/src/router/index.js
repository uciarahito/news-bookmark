import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import LoginRegister from '@/components/LoginRegister'
import Register from '@/components/Register'
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/loginregister',
      name: 'LoginRegister',
      component: LoginRegister
    }
  ]
})
