<template>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGsbStore } from '@/stores/gsbStore'

const login = ref('')
const password = ref('')
const erreur = ref(false)
const succes = ref(false)

const router = useRouter()
const gsbStore = useGsbStore()

async function getLogin() {
  erreur.value = false
  succes.value = false

  try {
    await gsbStore.loginVisiteur(login.value, password.value)
    succes.value = true
    router.push('/accueil')
  } catch {
    erreur.value = true
  }
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
