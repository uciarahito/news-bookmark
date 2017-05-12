<template>
<div class="container">
  <div class="jarakformregister">
    <ul class="nav nav-tabs">
      <li class="active">
        <a>Login</a>
      </li>
      <li>
        <a href="/#/register">Register</a>
      </li>
    </ul>

    <table class="table">
      <tbody>
        <tr>
          <th>Username</th>
          <th><input type="text" class="form-control" v-model="user.username"></th>
        </tr>
        <tr>
          <th>Password</th>
          <th><input type="password" class="form-control" v-model="user.password"></th>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-success" v-on:click="onLogin">Login</button>
    <button type="button" class="btn btn-primary" v-on:click="loginFB">Login FB</button>
  </div>
</div>
</template>

<script>
import router from '../router/index';
import toastr from 'toastr'

export default {
  name: 'loginnew',
  login: true,
  props: ['nilailogin'],
  data() {
    return {
      user: {
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
    cekLogin(){
      this.$emit('cekLogin')
    },
    onLogin() {
      let self = this
      // console.log("user: " + self.user);
      self.$http.post('http://localhost:3000/api/signin', {
        username: self.user.username,
        password: self.user.password
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.hasOwnProperty('err')) {
          self.message = response.data.err.errmsg
          toastr.success('Login Gagal');
        } else {
          self.message = response.data.message
          localStorage.setItem('token', response.data.token)
          toastr.success('Login Berhasil')
          self.cekLogin()
          // self.$router.push('/')
          window.location.href = "/"
        }
      })
      .catch(err => {
        alert('error login')
        console.log(err);
      })
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
							self.user.username = response.first_name + "_" + response.last_name
							self.user.password = response.name
              self.signup.name = response.name
              self.signup.username = 'ucilubis'
              self.signup.password = response.name
              self.signup.email = `${response.name}@facebook.com`
              self.cekLogin()
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
      self.$router.push('/')
    } else {
      self.$router.push('/loginnew')
    }
  }
}
</script>

<style scoped>
.container {
  width: 40%;
}
.jarakformregister {
  margin-top: 23px;
}
</style>