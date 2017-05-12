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
                <li><router-link to="login"><span class="glyphicon glyphicon-user"></span> SignIn</router-link></li>
                <li><a href="#" v-on:click="loginFB"><span class="glyphicon glyphicon-log-in"></span> SignIn FB</a></li>
              </ul>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" v-else>
              <ul class="nav navbar-nav navbar-right">
                <li><span class="glyphicon glyphicon-user"></span> Welcome</li>
                <li><a href="#" v-on:click="onLogout"><span class="glyphicon glyphicon-log-in"></span> SignOut</a></li>
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
      login: false,
      signin: {
        username: '',
        password: ''
      },
      signup: {
        name: '',
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    onLogout() {
      localStorage.removeItem('token');
      self.$router.push('/login')
    },
    loginFB: function() {
      let self = this
      FB.login(function(response) {
        if (response.status === 'connected') {
          FB.api('/me', 'GET',
					{
            fields: 'first_name,last_name,name,id'
          },
					 function(response) {
            if (response) {
							self.signin.username = response.first_name + "_" + response.last_name
							self.signin.password = response.name
              self.signup.name = response.name
              self.signup.username = 'ucilubis'
              self.signup.password = response.name
              self.signup.email = `${response.name}@facebook.com`
              // self.onRegister()
            } else {
              console.log('belum login')
            }
						console.log('FB ',response)
          });
        } else if (response.status === 'not_authorized') {
          console.log('We are not logged in.')
        } else {
          console.log('You are not logged into Facebook.');
        }
      }, {
        scope: 'email'
      });
    }
  },
  created() {
    let self = this
    if (localStorage.getItem('token') != null) {
      self.login = true
    } else {
      self.login = false
      alert('Login first!')
      self.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>