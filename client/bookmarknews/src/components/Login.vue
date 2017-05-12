<template>
<div id="app">
  <div class="login">

    <div class="container">
      <div class="col-md-4">
        <h1>Welcome</h1>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="username" v-model="user.username" style="margin-bottom: 5px">
          <input class="form-control" type="password" placeholder="password" v-model="user.password" style="margin-bottom: 5px">
          <button class="btn btn-primary" v-on:click="login">Sign In</button>
          <!-- <button v-on:click="login" class="btn btn-primary">Sign in</button> -->
          <p style="margin-top: 5px">Doesn't have an account? <span v-on:click="openRegForm" class="btn-link">register</span></p>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script type="text">
import router from '../router/index';
import toastr from 'toastr'
// import axios from 'axios'

export default {
  name: 'login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
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
            toastr.success('Login Sukses')
            self.$router.push('/')
          }
        })
        .catch(err => {
          alert('error login')
          console.log(err);
        })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  padding-top: 28px
}

.login {
  position: relative;
  left: 30%;
  top: 10em;
  width: 40%;
  font-family: Arial;
}
</style>
