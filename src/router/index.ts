import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import(/* webpackChunkName: "game" */ '@/views/Game.vue')
  },
  {
    path: '/lucky',
    name: 'Lucky',
    component: () => import('@/views/Lucky.vue')
  },
  { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
