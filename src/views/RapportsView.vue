
<template>
  <!-- Page qui affiche les rapports et les formulaires d'ajout ou de modification. -->
  <main class="rapports">
    <NavbarComponent />

    <h1>Mes rapports de visite</h1>
    <button @click="ouvrirAjout">
  Ajouter un rapport
</button>

<!-- Formulaire d'ajout -->
<section v-if="formulaireAjout" class="formulaire">
  <h2>Ajouter un rapport</h2>

  <label>Rechercher un médecin :</label>
  <input
    v-model="rechercheMedecin"
    @input="chercherMedecins"
    type="text"
    placeholder="Saisir le nom du médecin"
  >

  <select v-model="nouveauRapport.idMedecin">
    <option value="">Choisir un médecin</option>
    <option
      v-for="medecin in medecins"
      :key="medecin.id"
      :value="medecin.id"
    >
      {{ medecin.nom }} {{ medecin.prenom }}
    </option>
  </select>

  <label>Date :</label>
  <input v-model="nouveauRapport.date" type="date">

  <label>Motif :</label>
  <input v-model="nouveauRapport.motif" type="text">

  <label>Bilan :</label>
  <textarea v-model="nouveauRapport.bilan"></textarea>
  <label>Rechercher un médicament :</label>
<input
  v-model="rechercheMedicament"
  @input="chercherMedicaments"
  type="text"
  placeholder="Saisir le nom du médicament"
>

<select v-model="medicamentSelectionne">
  <option value="">Choisir un médicament</option>
  <option
    v-for="medicament in medicaments"
    :key="medicament.id"
    :value="medicament.id"
  >
    {{ medicament.nomCommercial }}
  </option>
</select>

<label>Quantité offerte :</label>
<input v-model.number="quantiteMedicament" type="number" min="1">

<button type="button" @click="ajouterMedicament">
  Ajouter ce médicament
</button>

<ul>
  <li v-for="(quantite, id) in nouveauRapport.medicaments" :key="id">
    {{ nomMedicament(id) }} : {{ quantite }}
    <button type="button" @click="supprimerMedicament(id)">
      Supprimer
    </button>
  </li>
</ul>
  <button @click="enregistrerAjout">Enregistrer</button>

<p>{{ messageAjout }}</p>
  <button @click="annulerAjout">Annuler</button>
</section>
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
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="rapport in rapports" :key="rapport.idRapport">
          <td>{{ rapport.date }}</td>
          <td>{{ rapport.prenomMedecin }} {{ rapport.nomMedecin }}</td>
          <td>{{ rapport.motif }}</td>
          <td>{{ rapport.bilan }}</td>
          <td>
            <button @click="modifierRapport(rapport)">
              Modifier
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulaire de modification -->
    <section v-if="rapportSelectionne" class="formulaire">
      <h2>Modifier le rapport</h2>

      <label>Motif :</label>
      <input v-model="rapportSelectionne.motif" type="text">

      <label>Bilan :</label>
      <textarea v-model="rapportSelectionne.bilan"></textarea>

      <button @click="enregistrerModification">
        Enregistrer
      </button>

      <button @click="annulerModification">
        Annuler
      </button>

      <p v-if="message">{{ message }}</p>
    </section>

  </main>
</template>

<script setup>
// Importe les états réactifs et le crochet exécuté à l'affichage de la page.
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGsbStore } from '@/stores/gsbStore'
import DataService from '@/services/DataService'
import NavbarComponent from '@/components/NavbarComponent.vue'

// Récupère le visiteur connecté pour filtrer ses rapports et créer les nouveaux.
const gsbStore = useGsbStore()
const { utilisateur } = storeToRefs(gsbStore)

// États de la liste et de l'édition d'un rapport existant.
const rapports = ref([])
const chargement = ref(true)
const erreur = ref(false)

const rapportSelectionne = ref(null)
const message = ref('')

// États utilisés pour la création d'un rapport et ses sélections associées.
const messageAjout = ref('')

// Formulaire d'ajout
const formulaireAjout = ref(false)
const rechercheMedecin = ref('')
const medecins = ref([])
const rechercheMedicament = ref('')
const medicaments = ref([])
const nomsMedicaments = ref({})
const medicamentSelectionne = ref('')
const quantiteMedicament = ref(1)

const nouveauRapport = ref({
  idMedecin: '',
  date: '',
  motif: '',
  bilan: '',
  medicaments: {}
})

// Charger les rapports du visiteur
// Charger les rapports d'une date
async function chargerRapportsDate(date) {
  // Demande au serveur les rapports du visiteur pour une date donnée.
  const resultat = await DataService.getLesRapportsUneDate(
    utilisateur.value.id,
    date
  )

  // Pour chaque résultat, récupère les détails complets du rapport en parallèle.
  const nouveauxRapports = await Promise.all(
    resultat.map(async (rapport) => {
      const details = await DataService.getLeRapport(rapport.idRapport)

      return {
        ...rapport,
        date: details.date
      }
    })
  )

  // Ajouter les rapports sans créer de doublons
  // Fusionne les anciennes et nouvelles entrées, puis déduplique par identifiant.
  const tousLesRapports = [...rapports.value, ...nouveauxRapports]

  rapports.value = [
    ...new Map(
      tousLesRapports.map(rapport => [
        rapport.idRapport,
        rapport
      ])
    ).values()
  ]
}

// Charger les rapports au démarrage
onMounted(async () => {
  // Au chargement, vérifie la session puis demande les rapports à afficher.
  try {
    if (!utilisateur.value) {
      throw new Error('Aucun visiteur connecté')
    }

    await chargerRapportsDate('2016-07-02')

  } catch (error) {
    console.error('Erreur lors du chargement :', error)
    erreur.value = true
  } finally {
    chargement.value = false
  }
})

    
// Sélectionner un rapport à modifier
function modifierRapport(rapport) {
  // Copie le rapport dans un état séparé que le formulaire pourra modifier.
  rapportSelectionne.value = {
    ...rapport
  }

  message.value = ''
}

// Enregistrer les modifications
async function enregistrerModification() {
  try {
    // Ne transmet que l'identifiant, le motif et le bilan à modifier.
    const rapport = {
      idRapport: rapportSelectionne.value.idRapport,
      motif: rapportSelectionne.value.motif,
      bilan: rapportSelectionne.value.bilan
    }

    // Envoie la modification à l'API.
    await DataService.majRapport(rapport)

    // Mettre à jour le tableau
    const index = rapports.value.findIndex(
      r => r.idRapport === rapport.idRapport
    )

    if (index !== -1) {
      rapports.value[index].motif = rapport.motif
      rapports.value[index].bilan = rapport.bilan
    }

    message.value = 'Rapport modifié avec succès.'
    rapportSelectionne.value = null

  } catch (error) {
    console.error('Erreur lors de la modification :', error)
    message.value = 'Erreur lors de la modification du rapport.'
  }
}

// Annuler la modification
function annulerModification() {
  // Ferme le formulaire et efface son message éventuel.
  rapportSelectionne.value = null
  message.value = ''
}
// Ouvrir le formulaire d'ajout
function ouvrirAjout() {
  // Affiche le formulaire d'ajout et ferme l'édition d'un autre rapport.
  formulaireAjout.value = true
  rapportSelectionne.value = null
}

// Rechercher les médecins
async function chercherMedecins() {
  try {
    // Si la recherche est vide, retire les options de médecins.
    if (rechercheMedecin.value.length === 0) {
      medecins.value = []
      return
    }

    // Demande à l'API les médecins correspondant au texte tapé.
    medecins.value = await DataService.getMedecins(
      rechercheMedecin.value
    )

  } catch (error) {
    console.error('Erreur lors de la recherche des médecins :', error)
  }
}
// Rechercher les médicaments
async function chercherMedicaments() {
  try {
    // Si la recherche est vide, retire les options de médicaments.
    if (rechercheMedicament.value.length === 0) {
      medicaments.value = []
      return
    }

    // Demande à l'API les médicaments correspondant au texte tapé.
    medicaments.value = await DataService.getMedicaments(
      rechercheMedicament.value
    )

  } catch (error) {
    console.error('Erreur lors de la recherche des médicaments :', error)
  }
}
// Ajouter un médicament au rapport
function ajouterMedicament() {
  // Ignore l'action sans médicament sélectionné ou avec une quantité invalide.
  if (!medicamentSelectionne.value || quantiteMedicament.value < 1) {
    return
  }

  // Enregistre la quantité par identifiant et garde le nom pour l'affichage.
  const id = medicamentSelectionne.value
  const medicament = medicaments.value.find(m => m.id === id)

  nouveauRapport.value.medicaments[id] = quantiteMedicament.value
  nomsMedicaments.value[id] = medicament.nomCommercial

  medicamentSelectionne.value = ''
  quantiteMedicament.value = 1
}

function nomMedicament(id) {
  // Renvoie le nom mémorisé, ou l'identifiant si le nom n'est pas connu.
  return nomsMedicaments.value[id] || id
}

// Supprimer un médicament du rapport
function supprimerMedicament(id) {
  // Supprime le médicament du rapport et son nom d'affichage.
  delete nouveauRapport.value.medicaments[id]
  delete nomsMedicaments.value[id]
}
// Annuler l'ajout
function annulerAjout() {
  // Ferme le formulaire et remet tous ses champs à leur valeur initiale.
  formulaireAjout.value = false

  nouveauRapport.value = {
    idMedecin: '',
    date: '',
    motif: '',
    bilan: '',
    medicaments: {}
  }

  rechercheMedecin.value = ''
  medecins.value = []

  rechercheMedicament.value = ''
  medicaments.value = []
  nomsMedicaments.value = {}

  medicamentSelectionne.value = ''
  quantiteMedicament.value = 1
}
// Enregistrer un nouveau rapport
async function enregistrerAjout() {
  // Vérifie que les champs obligatoires sont renseignés avant l'envoi.
  if (!nouveauRapport.value.idMedecin ||
      !nouveauRapport.value.date ||
      !nouveauRapport.value.motif ||
      !nouveauRapport.value.bilan) {
    messageAjout.value = 'Veuillez remplir tous les champs.'
    return
  }

  try {
    // Construit l'objet attendu par l'API, avec les identifiants sous forme numérique.
    const rapport = {
      idMedecin: Number(nouveauRapport.value.idMedecin),
      idVisiteur: utilisateur.value.id,
      date: nouveauRapport.value.date,
      motif: nouveauRapport.value.motif,
      bilan: nouveauRapport.value.bilan,
      medicaments:  nouveauRapport.value.medicaments
    }

    // Crée le rapport, puis actualise la liste pour la date du rapport ajouté.
    await DataService.ajouterRapport(rapport)

    // Recharger les rapports de la date du nouveau rapport
    await chargerRapportsDate(rapport.date)


    messageAjout.value = 'Rapport ajouté avec succès.'

  } catch (error) {
    console.error("Erreur lors de l'ajout :", error)
    messageAjout.value = "Erreur lors de l'ajout du rapport."
  }
}
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

button {
  padding: 8px 12px;
  margin: 5px;
  cursor: pointer;
}

.formulaire {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.formulaire label {
  display: block;
  margin-top: 15px;
  margin-bottom: 5px;
}

.formulaire input,
.formulaire textarea,
.formulaire select {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.formulaire textarea {
  min-height: 100px;
}
.formulaire select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}
</style>
