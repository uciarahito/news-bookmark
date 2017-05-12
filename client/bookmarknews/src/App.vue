<template>
  <div id="app">

    <navbar v-bind:nilailogin="isLogin" v-on:onSignOut="onLogout"></navbar>
    <router-view v-bind:nilailogin="isLogin"></router-view>

      <!-- <SourceSelection v-on:sourceChanged="sourceChanged"></SourceSelection>
      <Newlist v-bind:source="source"></Newlist> -->
  </div>
</template>

<script>
import Navbar from './components/Navbar'

// import SourceSelection from './components/SourceSelection'
// import Newlist from './components/Newlist'

export default {
  name: 'app',
  data() {
    return {
      source: "",
      isLogin: false
    }
  },
  methods: {
    onLogout() {
      let self = this
      localStorage.removeItem('token');
      self.isLogin = false
      self.$router.push('/loginnew')
      // window.location.href = "/#/loginnew"
    }
  },
  created() {
    let self = this
    if (localStorage.getItem('token') != null) {
      self.isLogin = true
    } else {
      self.isLogin = false
      window.location.href = "/#/loginnew"
    }
  }
}
</script>

<style>
#app {
  padding-top: 28px
}
</style>
