import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppExercises from '@/components/AppExercises.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: AppExercises
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
