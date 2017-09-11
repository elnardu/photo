<template lang="html">
  <div class="post my-3">
    <img :src="imgUrl" class="img-fluid"/>
    <div class="note d-flex flex-row justify-content-between align-items-center">
      <p class="author my-0 ml-2">@{{data.author}}</p>
      <button @click="like" class="likes btn btn-outline-danger btn-sm my-0 mr-2">{{data.likes}} ❤</button>
    </div>
    <p class="text p-3">{{data.text}}</p>
  </div>
</template>

<script>
export default {
  name: 'post',
  props: ['data', 'token'],
  computed: {
    imgUrl() {
      return '/images/' + this.data.image
    }
  },
  methods: {
    like() {
      this.$http.post('/api/post/like', {
        token: this.token,

      })
    }
  }
}
</script>

<style lang="css" scoped>
.post {
  width: 100%;
  background-color: #f7f7f7;
}
.author {
  font-size: 1em;
  font-weight: bold;
}
.note {
  height: 2em;
}
</style>
