
const API_URL = 'http://172.16.61.106/restGSB'

class DataService {

  // Récupérer les informations du visiteur
  async getVisiteur(login, password) {
    const params = new URLSearchParams({
      login,
      mdp: password
    })

    const url = `${API_URL}/connexion?${params.toString()}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`)
    }

    return await response.json()
  }

  // Récupérer la liste des médecins
  async getMedecins(nom = '') {
    const params = new URLSearchParams({ nom })

    const url = `${API_URL}/medecins?${params.toString()}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`)
    }

    return await response.json()
  }

}

export default new DataService()
