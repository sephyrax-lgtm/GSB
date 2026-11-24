
<template>
  <!-- Zone contenant le champ de recherche et les résultats éventuels. -->
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
// ref crée des valeurs réactives qui mettent à jour le template lorsqu'elles changent.
import { ref } from 'vue'
import { useGsbStore } from '@/stores/gsbStore'

// Récupère le magasin partagé pour accéder aux actions liées aux médecins.
const gsbStore = useGsbStore()

// Texte saisi dans le champ et liste des résultats renvoyés par l'API.
const nom = ref('')
const medecins = ref([])

// Rechercher les médecins à chaque saisie
async function getLesMedecins() {
  // Si le champ est vide, efface les résultats et arrête la fonction.
  if (nom.value === '') {
    medecins.value = []
    return
  }

  try {
    // Attend les résultats de recherche puis les place dans l'état réactif.
    medecins.value = await gsbStore.getLesMedecins(nom.value)
    console.log(medecins.value)
  } catch (error) {
    console.error('Erreur de recherche :', error)
  }
}

// Sélectionner un médecin
function getInfos(medecin) {
  // Enregistre le médecin choisi dans le magasin commun.
  gsbStore.getInfos(medecin)

  // Vide le champ et masque la liste des suggestions après la sélection.
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
