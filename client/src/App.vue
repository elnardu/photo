<template>
  <div id="app">
    <Navigation :logged="logged" @logout="logout"/>
    <router-view v-if="validated" :token="token" @token="setToken"></router-view>
  </div>
</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'app',
  components: {
    Navigation
  },
  data() {
    return {
      token: "",
      logged: false,
      validated: false

      // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjU4ZDdhNTkzZTdhY2E2NmIyMjBmMzA0MyIsImlhdCI6MTQ5MDUzMzc4MCwiZXhwIjoxNDkwNjIwMTgwfQ.wPBj-9LrvOjL_eiSqVmAYJFLSfrm9tt_XpLns1Mv42k",
      // logged: true
    }
  },
  mounted() {
    this.validateToken()
  },
  methods: {
    setToken(token) {
      this.token = token
      this.logged = true

      localStorage.logged = true
      localStorage.token = token
      localStorage.date = Date.now()
    },
    validateToken() {
      if(localStorage.logged && localStorage.date - Date.now() < 82800000) {  //1000*60*60*23
        this.setToken(localStorage.token)
        console.info("Token validated")
      } else {
        localStorage.logged = false
        localStorage.token = false
        localStorage.date = false
      }
      this.validated = true
    },
		logout() {
			localStorage.logged = false
			localStorage.token = false
			localStorage.date = false

			this.token = ""
			this.logged = false
			this.$router.push('/')
		}
  }
}
</script>

<style>
#app {
  width: 100vw;
  /*height: 100vh;*/
  margin: 0;
  padding: 0;
}
</style>
