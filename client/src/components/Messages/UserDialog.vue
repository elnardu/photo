<template lang="html">
	<div class="userdialog d-flex flex-column justify-content-center align-items-center p-3">
		<p v-if="userData.username" class="text-muted">Диалог с {{userData.name}} {{userData.surname}} (@{{username}})</p>
		<p v-else>Загрузка...</p>
		<p v-if="error" class="text-danger">{{errro}}</p>
		<form class="w-100" @submit.prevent="submitMessage">
			<textarea type="text" class="form-control" placeholder="Сообщение" v-model.trim="messageText"/>
			<button type="submit" class="btn btn-primary w-100 mt-2">Написать</button>
		</form>
		<div class="messages d-flex flex-column mt-2">
			<div v-for="mes in messages" class="message my-1" :class="{from: mes.from == userData._id, to: mes.to == userData._id}">
				{{mes.text}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'userdialog',
	props: ['token'],
	data() {
		return {
			username: "",
			messageText: "",
			messages: {},
			userData: {},
			error: "",
			refreshTimer: {}
		}
	},
	mounted() {
		this.username = this.$route.params.username
		this.$http.post('/api/user/get', {
			username: this.username,
			token: this.token
		}).then(res => {
			if (res.body.success) {
				this.userData = res.body.data
				this.refreshMessages()
			}
		})
		this.refreshTimer = setInterval(this.refreshMessages, 5000)
	},
	beforeDestroy() {
		clearInterval(this.refreshTimer)
	},
	methods: {
		submitMessage() {
			this.$http.post('/api/messages/sendMessage', {
				token: this.token,
				text: this.messageText,
				to: this.userData._id
			}).then(res => {
				if (res.body.success) {
					this.messageText = ""
					this.refreshMessages()
				}
			})
		},
		refreshMessages() {
			this.$http.post('/api/messages/getMessages', {
				with: this.userData._id,
				token: this.token
			}).then(res => {
				if (res.body.success) {
					this.messages = res.body.data
				}
			})
		}
	},
	watch: {
		$route(to, from) {
			this.username = this.$route.params.username
		}
	}
}
</script>

<style lang="css" scoped>
.userdialog {
	width: 100%;
	margin-top: 3.5em;
}
.messages {
	width: 100%;
}
.message {
	padding: 5px 10px;
	/*width: 100%;*/
	border-radius: 10px;
}
.to {
	align-self: flex-end;
	background-color: #a7fba9;
	/*text-align: right;*/
}
.from {
	align-self: flex-start;
	background-color: #f7f7f7;
	/*text-align: left;*/
}
</style>
