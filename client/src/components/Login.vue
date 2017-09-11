<template lang="html">
  <form class="login p-3" @submit.prevent="login">
    <div class="form-group">
      <label for="InputUsername">Логин</label>
      <input type="text" v-model.trim="username" class="form-control" id="InputUsername" placeholder="Логин">
    </div>
    <hr/>
    <div class="form-group">
      <label for="InputPassword">Пароль</label>
      <input type="password" v-model.trim="password" class="form-control" id="InputPassword" placeholder="Пароль">
    </div>
    <p v-if="error" class="text-danger">{{error}}</p>
    <button type="submit" class="btn btn-outline-primary" name="button">Войти</button>
  </form>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      if(!this.username || !this.password) {
        this.error = 'Необходимо заполнить все поля!'
      }
      this.$http.post('/auth/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if(!res.body.success) {
          this.error = res.body.error
          return
        } else {
          this.$emit('token', res.body.token)
          this.$router.push('/feed')
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.login {
  width: 100%;
  /*height: 100%;*/
  margin-top: 3em;
}
</style>
