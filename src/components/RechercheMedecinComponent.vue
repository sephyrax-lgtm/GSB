
<template>
  <section class="recherche">
    <h2>Rechercher un médecin</h2>

    <input
      v-model="nom"
      @input="getLesMedecins"
      placeholder="Saisir le nom du médecin"
    >

    <div v-if="medecins.length > 0" class="resultats">
      <p
        v-for="medecin in medecins"
        :key="medecin.id"
        @click="getInfos(medecin)"
      >
        {{ medecin.nom }} {{ medecin.prenom }}
      </p>
    </div>

    <p v-else-if="nom !== ''">
      Aucun médecin trouvé.
    </p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useGsbStore } from '@/stores/gsbStore'

const gsbStore = useGsbStore()

const nom = ref('')
const medecins = ref([])

// Rechercher les médecins à chaque saisie
async function getLesMedecins() {
  if (nom.value === '') {
    medecins.value = []
    return
  }

  try {
    medecins.value = await gsbStore.getLesMedecins(nom.value)
    console.log(medecins.value)
  } catch (error) {
    console.error('Erreur de recherche :', error)
  }
}

// Sélectionner un médecin
function getInfos(medecin) {
  gsbStore.getInfos(medecin)

  nom.value = ''
  medecins.value = []
}
</script>

<style scoped>
.recherche {
  max-width: 600px;
  margin: 20px auto;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.resultats {
  background: white;
  border: 1px solid #ddd;
  margin-top: 5px;
}

.resultats p {
  padding: 10px;
  margin: 0;
  cursor: pointer;
}

.resultats p:hover {
  background: #e8eef5;
}
</style>
