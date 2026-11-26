// Adresse de base du serveur REST auquel l'application demande ses données.
const API_URL = 'http://172.16.61.106/restGSB'   // 'http://192.168.1.70/restGSB'

// Regroupe les appels réseau à l'API dans une seule classe.
class DataService {

  // Récupérer les informations du visiteur
  async getVisiteur(login, password) {
    // Prépare les paramètres de connexion en les encodant pour une URL.
    const params = new URLSearchParams({
      login,
      mdp: password
    })

    // Envoie la requête au serveur et attend la réponse HTTP.
    const url = `${API_URL}/connexion?${params.toString()}` // Construction de l'URL avec les paramètres de connexion
    const response = await fetch(url)

    // Transforme toute réponse HTTP en erreur si son statut indique un échec.
    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`)
    }

    // Convertit le corps JSON reçu en objet JavaScript.
    return await response.json()
  }

  // Récupérer la liste des médecins
  async getMedecins(nom = '') {
    // Encode le nom recherché comme paramètre de requête.
    const params = new URLSearchParams({ nom })
    const url = `${API_URL}/medecins?${params.toString()}`
    // Effectue la recherche des médecins sur le serveur.
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`)
    }

    // Renvoie les médecins après conversion de la réponse JSON.
    return await response.json() // Retourne la liste des médecins
  }

  // Récupérer la liste des médicaments
async getMedicaments(nom = '') {
  // Le serveur attend le paramètre « nomCommercial » pour filtrer les produits.
  const params = new URLSearchParams({ nomCommercial: nom })
  const url = `${API_URL}/medicaments?${params.toString()}`
  // Demande la liste des médicaments correspondant au nom.
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`)
  }

  // Convertit la réponse JSON en données utilisables par Vue.
  return await response.json()
}

  // Récupérer les rapports d'un médecin
  async getLesRapports(idMedecin) {
    // Construit l'adresse de l'API avec l'identifiant du médecin.
    const url = `${API_URL}/rapports/${idMedecin}`
    // Demande les rapports associés à ce médecin.
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`)
    }

    // Renvoie la liste reçue au format JSON.
    return await response.json() // Retourne la liste des rapports
  }

  // Récupérer les rapports d'un visiteur à une date précise
async getLesRapportsUneDate(idVisiteur, date) {
  // Encode l'identifiant du visiteur et la date en paramètres d'URL.
  const params = new URLSearchParams({
    idVisiteur,
    date
  })

  const url = `${API_URL}/rapports_a_date?${params.toString()}`
  // Récupère les rapports du visiteur pour la date choisie.
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`)
  }

  // Renvoie les résultats convertis depuis le JSON.
  return await response.json()
}

// Récupérer un rapport par son identifiant
async getLeRapport(idRapport) {
  // Construit le chemin permettant de demander un rapport précis.
  const url = `${API_URL}/rapport/${idRapport}`
  // Envoie la requête de consultation de ce rapport.
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`)
  }

  // Convertit la réponse du serveur en objet JavaScript.
  return await response.json()
}

  // Modifier les informations d'un médecin
async majMedecin(medecin) {
  // Envoie une requête PUT pour transmettre les nouvelles données du médecin.
  const response = await fetch(`${API_URL}/majMedecin`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(medecin)
  })

  // Vérifie que le serveur a bien accepté la modification.
  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`)
  }

  // Récupère le texte de confirmation, l'affiche dans la console et le renvoie.
  const resultat = await response.text()
  console.log('Réponse du serveur :', resultat)
  return resultat
}
// Modifier un rapport
async majRapport(rapport) {

  // Envoyer les nouvelles informations à l'API
  const response = await fetch(`${API_URL}/majRapports`, {
    method: 'PUT',

    // Indiquer que les données sont au format JSON
    headers: {
      'Content-Type': 'application/json'
    },

    // Envoyer les informations du rapport
    body: JSON.stringify(rapport)
  })

  // Vérifier si la modification a réussi
  if (!response.ok) {
    throw new Error('Erreur lors de la modification du rapport')
  }

  // Récupérer la réponse du serveur
  return await response.text()
}

  // Ajouter un nouveau rapport
  async ajouterRapport(rapport) {

    // Envoyer le rapport à l'API
    const response = await fetch(`${API_URL}/ajouterRapport`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rapport)
    })

    // Vérifier si l'ajout a réussi
    if (!response.ok) {
      throw new Error('Erreur lors de l’ajout du rapport')
    }

    // Récupérer la réponse du serveur
    return await response.text()
  }

}

export default new DataService()