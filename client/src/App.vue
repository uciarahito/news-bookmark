<template>
<div id="app">
  <SourceSelection v-on:sourceChanged="sourceChanged"></SourceSelection>
  <Newlist v-bind:source="source"></Newlist>
  <!-- <BookmarkList></BookmarkList> -->
</div>
</template>

<script>
import SourceSelection from './components/SourceSelection'
import Newlist from './components/Newlist'
// import BookmarkList from './components/BookmarkList'

export default {
  name: 'app',
  components: {
    // Login,
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

<style>
#app {
  padding-top: 28px
}
</style>
