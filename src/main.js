// Importe la fonction Vue qui crée l'instance principale de l'application.
import { createApp } from 'vue'
// Importe Pinia, l'outil qui partage des données entre les composants.
import { createPinia } from 'pinia'
// Importe le composant racine, qui affichera la page choisie par le routeur.
import App from './App.vue'
// Importe la configuration des routes et des vues associées.
import router from './router'
// Charge la feuille de styles commune à toute l'application.
import './assets/styles/main.css'

// Crée l'application à partir du composant racine App.
const app = createApp(App)

// Rend Pinia disponible pour tous les composants Vue.
app.use(createPinia())
// Active la navigation entre les différentes pages.
app.use(router)

// Monte l'application dans l'élément HTML qui porte l'identifiant « app ».
app.mount('#app')
