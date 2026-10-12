<template>
  <main class="accueil">
  <div class="menu-medecins">
  <router-link to="/medecins">
    Consulter les médecins →
  </router-link>
</div>
    <!-- En-tête -->
    <header>
      <h1>Accueil GSB</h1>
      <p>Bienvenue {{ utilisateur?.prenom }} {{ utilisateur?.nom }}</p>
    </header>

    <!-- Informations du visiteur -->
    <section v-if="utilisateur" class="carte">
      <h2>Mes informations</h2>

      <p><strong>Identifiant :</strong> {{ utilisateur.id }}</p>
      <p><strong>Nom :</strong> {{ utilisateur.nom }}</p>
      <p><strong>Prénom :</strong> {{ utilisateur.prenom }}</p>
      <p><strong>Adresse :</strong> {{ utilisateur.adresse }}</p>
      <p><strong>Code postal :</strong> {{ utilisateur.cp }}</p>
      <p><strong>Ville :</strong> {{ utilisateur.ville }}</p>
    </section>

    <!-- Fonctionnalités -->
    <section class="fonctionnalites">
      <h2>Fonctionnalités</h2>

      <div class="cartes">
        <article class="carte">
          <h3>Médecins</h3>
          <p>Consulter les médecins.</p>
        </article>

        <article class="carte">
          <h3>Rapports de visite</h3>
          <p>Consulter les rapports enregistrés.</p>
        </article>

        <article class="carte">
          <h3>Nouveau rapport</h3>
          <p>Créer un rapport de visite.</p>
        </article>
      </div>
    </section>

  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useGsbStore } from '@/stores/gsbStore'

const gsbStore = useGsbStore()
const { utilisateur } = storeToRefs(gsbStore)
</script>

<style scoped>
.accueil {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  color: #243247;
}

header {
  padding: 20px;
  margin-bottom: 20px;
  background: #123b63;
  color: white;
  border-radius: 10px;
}

header h1 {
  margin-top: 0;
}

.carte {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.fonctionnalites {
  margin-top: 25px;
}

.cartes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

@media (max-width: 700px) {
  .cartes {
    grid-template-columns: 1fr;
  }
}
.menu-medecins {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.menu-medecins a {
  background-color: #123b63;
  color: white;
  padding: 12px 20px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.menu-medecins a:hover {
  background-color: #1e5b8f;
}
</style>
