import { defineStore } from 'pinia'
import DataService from '@/services/DataService'

export const useGsbStore = defineStore('gsb', {
  state: () => ({
    utilisateur: null,
    erreur: false
  }),

  actions: {
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
    }
  }
})
