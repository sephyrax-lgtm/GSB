
<template>
  <main class="rapports">
    <NavbarComponent />

    <h1>Mes rapports de visite</h1>

    <p v-if="chargement">Chargement des rapports...</p>

    <p v-else-if="erreur">
      Erreur lors du chargement des rapports.
    </p>

    <p v-else-if="rapports.length === 0">
      Aucun rapport trouvé.
    </p>

    <table v-else>
      <thead>
        <tr>
          <th>Date</th>
          <th>Médecin</th>
          <th>Motif</th>
          <th>Bilan</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="rapport in rapports" :key="rapport.idRapport">
          <td>{{ rapport.date }}</td>
          <td>{{ rapport.prenomMedecin }} {{ rapport.nomMedecin }}</td>
          <td>{{ rapport.motif }}</td>
          <td>{{ rapport.bilan }}</td>
        </tr>
      </tbody>
    </table>

  </main>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGsbStore } from '@/stores/gsbStore'
import DataService from '@/services/DataService'
import NavbarComponent from '@/components/NavbarComponent.vue'

const gsbStore = useGsbStore()
const { utilisateur } = storeToRefs(gsbStore)

const rapports = ref([])
const chargement = ref(true)
const erreur = ref(false)

onMounted(async () => {
  try {
    // Vérifier si un visiteur est connecté
    if (!utilisateur.value) {
      throw new Error('Aucun visiteur connecté')
    }

    const idVisiteur = utilisateur.value.id

    

const resultat = await DataService.getLesRapportsUneDate(
  idVisiteur,
  '2016-07-02'
)

rapports.value = await Promise.all(
  resultat.map(async (rapport) => {
    const details = await DataService.getLeRapport(rapport.idRapport)

    return {
      ...rapport,
      date: details.date
    }
  })
)

    console.log('Rapports récupérés :', rapports.value)

  } catch (error) {
    console.error('Erreur lors du chargement des rapports :', error)
    erreur.value = true
  } finally {
    chargement.value = false
  }
})

</script>

<style scoped>
.rapports {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
  color: #243247;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #123b63;
  color: white;
}
</style>
