import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Register from '@/components/Register'
import Login from '@/components/Login'
import About from '@/components/About'

import Dialogs from '@/components/Messages/Dialogs'
import Dialog from '@/components/Messages/UserDialog'

// import Feed from '@/components/Feed'
// import NewPost from '@/components/NewPost'
const Feed = r => require.ensure([], () => r(require('@/components/Feed')), 'group-feed')
const NewPost = r => require.ensure([], () => r(require('@/components/NewPost')), 'group-feed')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Привет',
      component: Hello
    },
    {
      path: '/about',
      name: 'О нас',
      component: About
    },
    {
      path: '/register',
      name: 'Регистрация',
      component: Register
    },
    {
      path: '/login',
      name: 'Вход',
      component: Login
    },
    {
      path: '/feed',
      name: 'Лента',
      component: Feed
    },
    {
      path: '/newpost',
      name: 'Создать запись',
      component: NewPost
    },
		{
      path: '/dialog/:username',
      name: 'Диалог',
      component: Dialog
    },
		{
      path: '/dialogs',
      name: 'Диалоги',
      component: Dialogs
    },
  ]
})
