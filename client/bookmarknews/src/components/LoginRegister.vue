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
          <th><input type="text" class="form-control"></th>
        </tr>
        <tr>
          <th>Password</th>
          <th><input type="password" class="form-control"></th>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-success">Login</button>
  </div>
</div>
</template>

<script>
export default {

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
