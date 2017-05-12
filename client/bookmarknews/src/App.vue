<template>
  <div id="app">

    <navbar></navbar>
    <router-view></router-view>

      <!-- <SourceSelection v-on:sourceChanged="sourceChanged"></SourceSelection>
      <Newlist v-bind:source="source"></Newlist> -->
  </div>
</template>

<script>
// import SourceSelection from './components/SourceSelection'
// import Newlist from './components/Newlist'

export default {
  name: 'app',
  data() {
    return {
      source: ""
    }
  },
  methods: {

  }
}
</script>

<style>
#app {
  padding-top: 28px
}
</style>
