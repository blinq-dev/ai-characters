import { createRouter, createWebHistory } from 'vue-router'

import ChatView from '../views/ChatView.vue'
import CharactersView from '../views/CharactersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/CharactersView.vue')
    },
    {
      path: '/chat/:slug',
      name: 'chatWithCharacter',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/CharactersView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
