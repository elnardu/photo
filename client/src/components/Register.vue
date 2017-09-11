<template lang="html">
  <form class="register p-3" @submit.prevent="register">
    <div class="form-group">
      <label for="InputName">Имя</label>
      <input type="text" v-model.trim="name" class="form-control" id="InputName" placeholder="Имя">
    </div>
    <div class="form-group">
      <label for="InputSurname">Фамилия</label>
      <input type="text" v-model.trim="surname" class="form-control" id="InputSurname" placeholder="Фамилия">
    </div>
    <hr/>
    <div class="form-group">
      <label for="InputEmail">E-mail</label>
      <input type="email" v-model.trim="email" class="form-control" id="InputEmail" placeholder="E-mail">
    </div>
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
    <button type="submit" class="btn btn-outline-primary" name="button">Зарегистрироваться</button>
  </form>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      name: "",
      surname: "",
      username: "",
      password: "",
      email: "",
      error: ""
    }
  },
  methods: {
    register() {
      if(!this.name || !this.surname || !this.username || !this.password || !this.email) {
        this.error = "Необходимо заполнить все поля"
        return
      }
      this.$http.post('/auth/register', {
        name: this.name,
        surname: this.surname,
        username: this.username,
        email: this.email,
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
.register {
  width: 100%;
  /*height: 100%;*/
  margin-top: 3em;
}
</style>
