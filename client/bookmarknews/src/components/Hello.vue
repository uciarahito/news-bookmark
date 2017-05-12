<template>
  <div id="app">
    <SourceSelection v-on:sourceChanged="sourceChanged"></SourceSelection>
    <Newlist v-bind:source="source"></Newlist>
  </div>
</template>

<script>

import SourceSelection from './SourceSelection'
import Newlist from './Newlist'

export default {
  name: 'hello',
  components: {
    SourceSelection,
    Newlist
  },
  data() {
    return {
      source: ""
    }
  },
  methods: {
    sourceChanged: function(source) {
      this.source = source
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app {
  padding-top: 28px
}
</style>
