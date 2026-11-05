
<template>
  <nav v-if="isNavMedVisible" class="sous-menu">
    <button @click="ongletActif = 'fiche'">
      Fiche médecin
    </button>

    <button @click="ongletActif = 'rapports'">
      Liste des rapports
    </button>
  </nav>

  <section v-if="isNavMedVisible">
    <FicheMedecinComponent v-if="ongletActif === 'fiche'" />

    <ListeRapportsComponent v-if="ongletActif === 'rapports'" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGsbStore } from '@/stores/gsbStore'

import FicheMedecinComponent from '@/components/FicheMedecinComponent.vue'
import ListeRapportsComponent from '@/components/ListeRapportsComponent.vue'

const gsbStore = useGsbStore()
const { isNavMedVisible } = storeToRefs(gsbStore)

const ongletActif = ref('fiche')
</script>

<style scoped>
.sous-menu {
  display: flex;
  gap: 15px;
  margin-top: 25px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #243247;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #36577d;
}
</style>
