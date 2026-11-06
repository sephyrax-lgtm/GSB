
<template>
  <section class="fiche-medecin" v-if="medecin">
    <h2>Fiche du médecin</h2>

    <form @submit.prevent="modifierMedecin">
      <label>Nom :</label>
      <input v-model="form.nom" type="text" required>

      <label>Prénom :</label>
      <input v-model="form.prenom" type="text" required>

      <label>Adresse :</label>
      <input v-model="form.adresse" type="text">

      <label>Code postal :</label>
      <input v-model="form.cp" type="text">

      <label>Ville :</label>
      <input v-model="form.ville" type="text">

      <label>Téléphone :</label>
      <input v-model="form.tel" type="text">

      <button type="submit">Modifier</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </section>

  <p v-else>Aucun médecin sélectionné.</p>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGsbStore } from '@/stores/gsbStore'
import DataService from '@/services/DataService'

const gsbStore = useGsbStore()
const { medecin } = storeToRefs(gsbStore)

const message = ref('')

const form = ref({
  nom: '',
  prenom: '',
  adresse: '',
  cp: '',
  ville: '',
  tel: ''
})

// Remplir le formulaire avec les informations du médecin
watch(medecin, (nouveauMedecin) => {
  if (nouveauMedecin) {
    form.value = {
      nom: nouveauMedecin.nom || '',
      prenom: nouveauMedecin.prenom || '',
      adresse: nouveauMedecin.adresse || '',
      cp: nouveauMedecin.cp || '',
      ville: nouveauMedecin.ville || '',
      tel: nouveauMedecin.tel || ''
    }
  }
}, { immediate: true })

// Enregistrer les modifications
async function modifierMedecin() {
  try {
    await DataService.majMedecin({
      id: medecin.value.id,
      ...form.value
    })

    message.value = 'Médecin modifié avec succès.'
  } catch (error) {
    console.error(error)
    message.value = 'Erreur lors de la modification.'
  }
}
</script>

<style scoped>
.fiche-medecin {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

h2 {
  color: #243247;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-top: 10px;
  padding: 10px;
  background: #243247;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
