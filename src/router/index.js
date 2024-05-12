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
      path: '/exported',
      component: () => import('../views/AppExported.vue')
    },
  ],
})

export default router