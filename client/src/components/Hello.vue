<template>
  <div class="hello d-flex flex-column justify-content-center align-items-center p-3">
    <h1>Привет</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <div class="">
      <router-link class="btn btn-outline-primary" to="/register">Зарегистрироваться</router-link>
      <router-link class="btn btn-outline-success" to="/login">Войти</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  /*height: 100%;*/
  margin-top: 3.5em;
}
</style>
