<template>
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
              <h4>{{ logo }}</h4>
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" v-if="login">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#" v-on:click="onLogout"><span class="glyphicon glyphicon-log-in"></span> {{txtLogOut}}</a></li>
            </ul>
          </div>
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" v-else>
            <ul class="nav navbar-nav navbar-right">
              <li><router-link to="loginnew"><span class="glyphicon glyphicon-log-out"></span> {{txtLogIn}}</router-link></li>
            </ul>
          </div>
          <!-- /.navbar-collapse -->
      </div>
      <!-- /.container -->
  </nav>

</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      logo: 'BookmarkNews',
      login: true,
      txtLogIn: '',
      txtLogOut: ''
    }
  },
  methods: {
    onLogout() {
      localStorage.removeItem('token');
      this.login = false
      // self.$router.push('/loginnew')
      window.location.href = "/#/loginregister"
    }
  },
  created() {
    let self = this
    if (localStorage.getItem('token') != null) {
      self.txtLogOut = 'SignOut'
      self.txtLogIn = ''
      self.login = true
    } else {
      self.txtLogOut = ''
      self.txtLogIn = 'SignIn'
      self.login = false
      self.$router.push('/loginnew')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>