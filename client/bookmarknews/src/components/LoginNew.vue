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
    <button type="button" class="btn btn-success" v-on:click="login">Login</button>
  </div>
</div>
</template>

<script>
import router from '../router/index';
import toastr from 'toastr'

export default {
  name: 'loginnew',
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