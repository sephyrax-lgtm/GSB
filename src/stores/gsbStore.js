
// Importe la fonction qui déclare un magasin de données Pinia.
import { defineStore } from 'pinia'
// Importe les fonctions utilisées pour communiquer avec l'API.
import DataService from '@/services/DataService'

// Crée le magasin partagé nommé « gsb » pour l'ensemble de l'application.
export const useGsbStore = defineStore('gsb', {
  // state contient les données communes et leur valeur initiale.
  state: () => ({
    // Informations du visiteur connecté
    utilisateur: JSON.parse(localStorage.getItem('visiteur')) || null,
    erreur: false,

    // Médecin sélectionné
    medecin: null,

    // Affichage du menu du médecin
    isNavMedVisible: false,

    // Actualisation des composants
    maj: 0
  }),

  actions: {
    // Connexion du visiteur
    async loginVisiteur(login, password) {
      // Réinitialise l'indicateur d'erreur avant une nouvelle tentative.
      this.erreur = false

      try {
        // Demande au service API de vérifier les identifiants.
        this.utilisateur = await DataService.getVisiteur(login, password)

        // Conserver le visiteur après actualisation
        localStorage.setItem(
          'visiteur',
          JSON.stringify(this.utilisateur)
        )

        return this.utilisateur
      } catch (error) {
        // En cas d'échec, efface la session enregistrée et signale l'erreur.
        this.utilisateur = null
        localStorage.removeItem('visiteur')
        this.erreur = true
        throw error
      }
    },

    // Récupérer les médecins depuis l'API
    async getLesMedecins(nom) {
      // Transmet la recherche au service et renvoie sa réponse.
      return await DataService.getMedecins(nom)
    },

    // Enregistrer le médecin sélectionné
    getInfos(medecin) {
      // Mémorise le médecin choisi et rend visible son menu de détails.
      this.medecin = medecin
      this.isNavMedVisible = true
    }
  }
})
