<template lang="html">
  <div class="newpost p-3">
    <div v-if="!imageUploaded" class="form-group">
      <label for="exampleInputFile">Загрузить картинку</label>
      <input type="file" class="form-control-file" id="exampleInputFile" @change="uploadImage" aria-describedby="fileHelp" accept="image">
    </div>
    <img v-else :src="imageUrl" class="rounded mx-auto d-block img-fluid" alt=""/>
    <button v-if="imageUploaded" type="button" name="button" class="btn btn-outline-danger mt-2" @click="redo">Загрузить еще раз</button>
    <p v-if="error" class="text-danger">{{error}}</p>
    <form v-if="imageUploaded" @submit.prevent="submit" class="mt-2">
      <div class="form-group">
        <textarea rows="4" type="text" v-model.trim="text" class="form-control" placeholder=""/>
      </div>
      <button type="submit" class="btn btn-outline-primary" name="button">Отправить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'newpost',
  props: ['token'],
  data() {
    return {
      imageUploaded: false,
      imageName: '',
      imageUrl: '',
      text: '',
      error: ''
    }
  },
  methods: {
    uploadImage(e){
      this.error = ""
      var files = e.target.files
      if (!files.length) return
      var formData = new FormData();
      formData.append('image', files[0])
      this.$http.post('/api/post/upload', formData, {
        params: {
          token: this.token
        }
      }).then(res => {
        if(res.data.success) {
          this.imageUploaded = true
          this.imageName = res.data.name
          this.imageUrl = '/images/raw/' + res.data.name
          this.imageType = res.data.type
        } else {
          this.error = res.data.error
        }
      })
    },
    submit() {
      if(!this.text) {
        this.error = "Необходима подпись!"
        return
      }
      this.$http.post('/api/post/new', {
        text: this.text,
        image: this.imageName,
        type: this.imageType,
        token: this.token
      }).then(res => {
        console.log(res)
        this.$router.push('/feed')
      });
    },
    redo() {
      this.imageUploaded = false
      this.imageName = ''
      this.imageUrl = ''
      this.imageType = ''
    }
  }
}
</script>

<style lang="css" scoped>
.newpost {
  width: 100%;
  margin-top: 3.5em;
}
</style>
