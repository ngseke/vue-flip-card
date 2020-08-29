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
    path: '/result/:id',
    name: 'Result',
    component: () => import(/* webpackChunkName: "result" */ '@/views/Result.vue')
  },
  {
    path: '/lucky',
    name: 'Random',
    component: () => import('@/views/Lucky.vue')
  },
  { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
