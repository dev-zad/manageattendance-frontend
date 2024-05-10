import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '../views/AppHome.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppHome
    },
    {
      path: '/about',
      component: () => import('../views/AppAbout.vue')
    },
  ],
})

export default router