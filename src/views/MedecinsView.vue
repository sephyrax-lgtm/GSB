<template>
  <main class="medecins">
    <h1>Liste des médecins</h1>

    <input
      v-model="recherche"
      placeholder="Rechercher un médecin par nom"
    >

    <p v-if="chargement">Chargement des médecins...</p>
    <p v-else-if="erreur">Erreur lors du chargement des médecins.</p>

    <section v-else>
      <p>{{ medecinsFiltres.length }} médecin(s) trouvé(s)</p>

      <article
        v-for="medecin in medecinsFiltres"
        :key="medecin.id"
        class="carte"
      >
        <h2>{{ medecin.nom }} {{ medecin.prenom }}</h2>
        <p><strong>Adresse :</strong> {{ medecin.adresse }}</p>
        <p><strong>Téléphone :</strong> {{ medecin.tel }}</p>
      </article>
    </section>
  </main>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import DataService from '@/services/DataService'

const medecins = ref([])
const recherche = ref('')
const chargement = ref(true)
const erreur = ref(false)

// Charger les médecins depuis l'API
onMounted(async () => {
  try {
    medecins.value = await DataService.getMedecins()
  } catch (error) {
    erreur.value = true
  } finally {
    chargement.value = false
  }
})

// Filtrer les médecins selon la recherche
const medecinsFiltres = computed(() => {
  return medecins.value.filter(medecin =>
    medecin.nom.toLowerCase().includes(recherche.value.toLowerCase())
  )
})

</script>

<style scoped>
.medecins {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.carte {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.carte h2 {
  color: #123b63;
}

</style>