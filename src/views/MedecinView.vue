
<template>
  <!-- Page de consultation des médecins. -->
  <main class="medecins">
    <NavbarComponent />

    <h1>Liste des médecins</h1>

    <!-- Composant de recherche -->
    <RechercheMedecinComponent />
    <SousMenuMedecinComponent />

    <!-- Informations du médecin sélectionné -->
    <section v-if="medecin" class="carte">
      <h2>Médecin sélectionné</h2>

      <p><strong>Nom :</strong> {{ medecin.nom }}</p>
      <p><strong>Prénom :</strong> {{ medecin.prenom }}</p>
      <p><strong>Adresse :</strong> {{ medecin.adresse }}</p>
      <p><strong>Téléphone :</strong> {{ medecin.tel }}</p>
      <p><strong>Spécialité :</strong> {{ medecin.specialite }}</p>
    </section>

  </main>
</template>


<script setup>
// Importe les outils de réactivité et le crochet appelé au montage du composant.
import { ref, computed, onMounted } from 'vue'
import DataService from '@/services/DataService'
import NavbarComponent from '@/components/NavbarComponent.vue'
import RechercheMedecinComponent from '@/components/RechercheMedecinComponent.vue'
import { useGsbStore } from '@/stores/gsbStore'
import SousMenuMedecinComponent from '@/components/SousMenuMedecinComponent.vue'


// Variables qui stockent les médecins et l'état du chargement initial.
const medecins = ref([])
const recherche = ref('')
const chargement = ref(true)
const erreur = ref(false)

onMounted(async () => {
  // Charge la liste des médecins dès l'affichage de cette page.
  try {
    medecins.value = await DataService.getMedecins()
  } catch (error) {
    erreur.value = true
  } finally {
    chargement.value = false
  }
})

const medecinsFiltres = computed(() => {
  // Produit une liste dérivée qui ne contient que les noms correspondants.
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
