<template>
  <main class="accueil">
    <h1>Accueil GSB</h1>

    <section v-if="utilisateur">
      <h2>Bienvenue</h2>
      <pre>{{ utilisateur }}</pre>
    </section>

    <p v-else>Aucun utilisateur connecté.</p>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useGsbStore } from '@/stores/gsbStore'

const gsbStore = useGsbStore()
const { utilisateur } = storeToRefs(gsbStore)
</script>

<style scoped>
.accueil {
  padding: 2rem;
}

pre {
  padding: 1rem;
  overflow: auto;
  background: #f5f5f5;
  border-radius: 8px;
}
</style>
