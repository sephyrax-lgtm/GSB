/**
 * Service dédié aux appels vers l'API REST GSB.
 * Les méthodes API seront complétées au fur et à mesure du projet.
 */

const API_URL = 'http://localhost'

class DataService {
  async getVisiteur(login, password) {
    const url = `${API_URL}/restGSB/visiteur/${encodeURIComponent(login)}/${encodeURIComponent(password)}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`)
    }

    return await response.json()
  }
}

export default new DataService()
