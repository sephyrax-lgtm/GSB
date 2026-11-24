
<template>
  <!-- Présente les états de chargement, d'erreur, de liste vide ou le tableau. -->
  <section class="liste-rapports">
    <h2>Rapports du médecin</h2>

    <p v-if="chargement">Chargement des rapports...</p>

    <p v-else-if="erreur">
      Erreur lors du chargement des rapports.
    </p>

    <p v-else-if="rapports.length === 0">
      Aucun rapport trouvé pour ce médecin.
    </p>

    <table v-else>
      <thead>
        <tr>
          <th>Date</th>
          <th>Motif</th>
          <th>Bilan</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(rapport, index) in rapports" :key="index">
          <td>{{ rapport.date }}</td>
          <td>{{ rapport.motif }}</td>
          <td>{{ rapport.bilan }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
// Importe les outils Vue pour l'état réactif et l'exécution au montage.
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGsbStore } from '@/stores/gsbStore'
import DataService from '@/services/DataService'

// Récupère le médecin sélectionné pour demander ses rapports.
const gsbStore = useGsbStore()
const { medecin } = storeToRefs(gsbStore)

// États d'affichage : liste, chargement en cours et présence d'une erreur.
const rapports = ref([])
const chargement = ref(true)
const erreur = ref(false)

onMounted(async () => {
  // Lance le chargement dès que le composant est ajouté à la page.
  try {
    // Attend la réponse de l'API pour le médecin actuellement sélectionné.
    rapports.value = await DataService.getLesRapports(medecin.value.id)
  } catch (error) {
    console.error(error)
    erreur.value = true
  } finally {
    chargement.value = false
  }
})
</script>

<style scoped>
.liste-rapports {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #243247;
  color: white;
}
</style>
