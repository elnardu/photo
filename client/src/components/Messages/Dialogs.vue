<template>
<div class="dialogs d-flex flex-column justify-content-center align-items-center p-3">
	<p v-if="error" class="text-danger">{{error}}</p>
	<form v-if="formToggled" class="form-inline d-flex flex-row justify-content-between w-100" @submit.prevent="createDialog">
		<div class="input-group username-input mr-3">
			<div class="input-group-addon">@</div>
			<input type="text" class="form-control" placeholder="Имя пользователя" v-model.trim="searchQuery"/>
		</div>
		<button type="submit" class="btn btn-primary">Написать</button>
	</form>
	<button v-else href="#" class="text-primary newdialog my-2" @click="toggleForm">+ Новый диалог</button>
	<ul v-if="searchResults.length != 0" class="list-group w-100 mt-2">
		<li v-for="user in searchResults" class="list-group-item d-flex flex-row justify-content-between" @click="chooseFromSearch(user.username)">
			<span class="search-username">@{{user.username}}</span>
			<span class="search-fullname">{{user.name}} {{user.surname}}</span>
		</li>
	</ul>
	<ul class="list-group w-100 mt-2 pt-2 availableDialogs">
		<li v-for="user in dialogs" class="list-group-item d-flex flex-row justify-content-between" @click="chooseDialog(user.username)">
			<span class="search-username">@{{user.username}}</span>
			<span class="search-fullname">{{user.name}} {{user.surname}}</span>
		</li>
	</ul>
</div>
</template>

<script>
import debounce from 'debounce'
export default {
	name: 'dialogs',
	props: ['token'],
	data() {
		return {
			dialogs: [],
			formToggled: false,
			searchResults: [],
			searchQuery: "",
			error: ""
		}
	},
	mounted() {
		this.$http.post('/api/messages/getDialogsData', {
			token: this.token
		}).then(res => {
			if (res.body.success) {
				this.dialogs = res.body.data
			}
		})
	},
	methods: {
		toggleForm() {
			this.formToggled = true
		},
		chooseFromSearch(username) {
			this.searchQuery = username
		},
		chooseDialog(username) {
			this.$router.push(`/dialog/${username}`)
		},
		createDialog() {
			if(!this.searchQuery){
				return
			}
			if (this.searchResults.length == 0) {
				this.error = "Этого пользователя не существует"
				return
			}
			let withUserId = ""
			this.searchResults.forEach(e => {
				if (e.username == this.searchQuery) withUserId = e._id
			})
			this.$http.post('/api/messages/createDialog', {
				with: withUserId,
				token: this.token
			}).then(res => {
				if (res.body.success) {
					this.$router.push(`/dialog/${this.searchQuery}`)
				} else {
					this.error = res.body.error
				}
			})
		},
		search: debounce(function(username) {
			this.$http.post('/api/user/find', {
				token: this.token,
				query: username
			}).then(res => {
				if (res.body.success) {
					this.searchResults = res.body.data
				} else {
					this.searchResults = []
				}
			})
		}, 500)
	},
	watch: {
		searchQuery(to, from) {
			this.error = ""
			if (!to) {
				this.searchResults = []
				return
			}
			this.search(to)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dialogs {
	width: 100%;
	margin-top: 3.5em;
}

.availableDialogs {
	border-top: 1px solid #eceeef;
}

.username-input {
	width: 60%;
}

.search-username {
	font-weight: bold;
}

.search-fullname {
	/*text-align: right;*/
}

.newdialog {
	border: none;
	background: none;
}
</style>
