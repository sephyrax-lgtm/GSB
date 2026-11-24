<template>
  <!-- Carte contenant le formulaire de connexion et ses messages de retour. -->
  <main class="login-page">
    <section class="login-card">
      <h1>GSB</h1>
      <h2>Connexion</h2>

      <div v-if="erreur" class="error-banner">
        Erreur d'authentification
      </div>

      <form @submit.prevent="getLogin">
        <label for="login">Login</label>
        <input id="login" v-model="login" type="text" required />

        <label for="password">Mot de passe</label>
        <input id="password" v-model="password" type="password" required />

        <button type="submit">Connexion</button>
      </form>

      <p v-if="succes" class="success-message">Succès</p>
    </section>
  </main>
</template>

<script setup>
// Importe ref pour créer des variables réactives et useRouter pour changer de page.
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGsbStore } from '@/stores/gsbStore'

// Champs et indicateurs utilisés par le formulaire.
const login = ref('')
const password = ref('')
const erreur = ref(false)
const succes = ref(false)

// Récupère les outils de navigation et le magasin de l'application.
const router = useRouter()
const gsbStore = useGsbStore()

async function getLogin() {
  // Efface les messages précédents avant de lancer l'authentification.
  erreur.value = false
  succes.value = false

  // Demande au magasin de vérifier le login et le mot de passe auprès de l'API.
const visiteur = await gsbStore.loginVisiteur(
  login.value,
  password.value
)

console.log('Visiteur connecté :', visiteur)
console.log('Visiteur enregistré dans Pinia :', gsbStore.utilisateur)

// En cas de réussite, confirme la connexion puis navigue vers l'accueil.
succes.value = true
router.push('/accueil')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.login-card {
  width: min(420px, 100%);
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
}

form {
  display: grid;
  gap: 0.75rem;
}

input {
  padding: 0.7rem;
}

button {
  margin-top: 0.5rem;
  padding: 0.7rem;
  cursor: pointer;
}

.error-banner {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f8d7da;
  color: #842029;
  border-radius: 6px;
}

.success-message {
  color: #198754;
}
</style>
