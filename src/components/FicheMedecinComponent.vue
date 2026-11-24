
<template>
  <!-- La fiche n'est affichée que si un médecin est présent dans le magasin. -->
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
      <label>Spécialité :</label>
      <input v-model="form.specialite" type="text">           

      <button type="submit">Modifier</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </section>

  <p v-else>Aucun médecin sélectionné.</p>
</template>

<script setup>
// Importe ref pour créer des états réactifs et watch pour réagir au changement de médecin.
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGsbStore } from '@/stores/gsbStore'
import DataService from '@/services/DataService'

// Récupère le médecin sélectionné depuis le magasin Pinia.
const gsbStore = useGsbStore()
const { medecin } = storeToRefs(gsbStore)

// Message affiché après la tentative de mise à jour.
const message = ref('')

// Valeurs réactives liées aux champs du formulaire avec v-model.
const form = ref({
  nom: '',
  prenom: '',
  adresse: '',
  cp: '',
  ville: '',
  tel: '',
  specialite: ''
})

// Remplir le formulaire avec les informations du médecin
watch(medecin, (nouveauMedecin) => {
  // Quand un médecin est choisi, copie ses données dans le formulaire.
  if (nouveauMedecin) {
    form.value = {
      nom: nouveauMedecin.nom || '',
      prenom: nouveauMedecin.prenom || '',
      adresse: nouveauMedecin.adresse || '',
      cp: nouveauMedecin.cp || '',
      ville: nouveauMedecin.ville || '',
      tel: nouveauMedecin.tel || '',
      specialite: nouveauMedecin.specialitecomplementaire || ''
    }
  }
}, { immediate: true })

// Enregistrer les modifications
async function modifierMedecin() {
  try {
    // Ajoute l'identifiant aux valeurs du formulaire pour identifier l'enregistrement.
    const donnees = {
      id: medecin.value.id,
      ...form.value
    }

    console.log('Données envoyées :', donnees)

    // Envoie les données à l'API puis affiche une confirmation.
    await DataService.majMedecin(donnees)

    message.value = 'Médecin modifié avec succès.'
  } catch (error) {
    // Affiche l'erreur technique dans la console et un message dans la page.
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
