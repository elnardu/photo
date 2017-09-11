<template lang="html">
  <div class="feed">
    <Post v-for="post in posts" :data="post" :token="token" :key='post._id'/>
  </div>
</template>

<script>
import Post from './Post'

export default {
  name: 'feed',
  props: ['token'],
  components: {
    Post
  },
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      this.$http.post('/api/post/list', {token: this.token}).then(res=>{
        if(res.data.success) {
          this.posts = res.data.posts
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.feed {
  width: 100%;
  margin-top: 3.5em;
}
</style>
