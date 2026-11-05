
import { defineStore } from 'pinia'
import DataService from '@/services/DataService'

export const useGsbStore = defineStore('gsb', {
  state: () => ({
    // Informations du visiteur connecté
    utilisateur: null,
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
      this.erreur = false

      try {
        this.utilisateur = await DataService.getVisiteur(login, password)
        return this.utilisateur
      } catch (error) {
        this.utilisateur = null
        this.erreur = true
        throw error
      }
    },

    // Récupérer les médecins depuis l'API
    async getLesMedecins(nom) {
      return await DataService.getMedecins(nom)
    },

    // Enregistrer le médecin sélectionné
    getInfos(medecin) {
      this.medecin = medecin
      this.isNavMedVisible = true
    }
  }
})
