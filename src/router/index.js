import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AccueilView from '@/views/AccueilView.vue'
import MedecinsView from '@/views/MedecinsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/accueil',
      name: 'accueil',
      component: AccueilView
    },
    {
      path: '/medecins',
      name: 'medecins',
      component: MedecinsView
    }
  ]
})

export default router
