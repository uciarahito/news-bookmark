<template>
    <div class="login">
      <h2>Login</h2>
      <form class="login-form">
        <div class="form-group">
          <label class="label-info">Username</label>
          <input class="input-info" type="text" v-model="user.userName" />
        </div>
        <div class="form-group">
          <label class="label-info">Password</label>
          <input class="input-info" type="password" v-model="user.password" />
        </div>
        <div class="form-control">
          <button class="button" type="reset">Reset</button>
          <button class="button" type="submit" v-on:click="login">Login</button>
        </div>
      </form>
    </div>
</template>

<script type="text/ecmascript-6">

import router from '../router/index';
import toastr from 'toastr'
// import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      user: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    // login() {
    //   let self = this
    //   console.log("user: " + self.user);
    //   Vue.axios.post('http://localhost:3000/api/signin', {
    //     username: self.user.userName,
    //     password: self.user.password
    //   })
    //   .then((response) => {
    //     // console.log("login: " + response);
    //     if (response.data.success == true) {
    //       console.log(response.data);
    //       localStorage.setItem('token', response.data.token)
    //       // toastr.success('Login Sukses')
    //       self.$router.push('/')
    //     } else {
    //       console.log('Login Gagal');
    //       // toastr.success('Login Gagal');
    //     }
    //   })
    //   .catch(err => {
    //     alert('error login')
    //     console.log(err);
    //   })
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.login
  position: relative;
  left: 30%;
  top: 10em;
  width: 40%;
  font-family: Arial;
  .login-form
    margin: 0 auto;
    width: 80%;
    font-size: 18px;
    .form-group
      padding-top: 10px;
      height: 60px;
      .label-info
        width: 40%;
        height: 60px;
        line-height: 60px;
        text-align: right;
        font-weight: bold;
      .input-info
        width: 60%;
        height: 35px;
        border-radius: 4px;
        font-size: 18px;
        outline: none;
    .form-control
      text-align: right;
      margin-right: 62px;
      .button
        width: 100px;
        height: 30px;
        border-radius: 5px;
</style>