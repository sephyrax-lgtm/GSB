
const API_URL = 'http://192.168.1.70/restGSB'

class DataService {

  // Récupérer les informations du visiteur
  async getVisiteur(login, password) {
    const params = new URLSearchParams({
      login,
      mdp: password
    })

    const url = `${API_URL}/connexion?${params.toString()}` // Construction de l'URL avec les paramètres de connexion
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

    return await response.json() // Retourne la liste des médecins
  }

  // Récupérer les rapports d'un médecin
  async getLesRapports(idMedecin) {
    const url = `${API_URL}/rapports/${idMedecin}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`)
    }

    return await response.json() // Retourne la liste des rapports
  }

  // Récupérer les rapports d'un visiteur à une date précise
async getLesRapportsUneDate(idVisiteur, date) {
  const params = new URLSearchParams({
    idVisiteur,
    date
  })

  const url = `${API_URL}/rapports_a_date?${params.toString()}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`)
  }

  return await response.json()
}

// Récupérer un rapport par son identifiant
async getLeRapport(idRapport) {
  const url = `${API_URL}/rapport/${idRapport}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`)
  }

  return await response.json()
}

  // Modifier les informations d'un médecin
async majMedecin(medecin) {
  const response = await fetch(`${API_URL}/majMedecin`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(medecin)
  })

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`)
  }

  const resultat = await response.text()
  console.log('Réponse du serveur :', resultat)
  return resultat
}
}

export default new DataService()
