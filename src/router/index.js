// Importe les fonctions qui créent le routeur et utilisent l'historique du navigateur.
import { createRouter, createWebHistory } from 'vue-router'
// Importe les pages qui seront affichées selon l'URL.
import LoginView from '@/views/LoginView.vue'
import AccueilView from '@/views/AccueilView.vue'
import MedecinsView from '@/views/MedecinView.vue'
import RapportsView from '@/views/RapportsView.vue'

// Configure le système de navigation de l'application.
const router = createRouter({
  // Utilise des URL classiques gérées par l'historique du navigateur.
  history: createWebHistory(),
  // Déclare les chemins accessibles et la page associée à chacun.
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
    },
    {
      path: '/rapports',
      name: 'rapports',
      component: RapportsView
    }
  
  ]
})

export default router
