<template>
  <!-- Affiche ici le composant correspondant à l'adresse actuellement visitée. -->
  <RouterView />
</template>

<script setup>
// Importe le composant spécial qui affiche la vue choisie par le routeur.
import { RouterView } from 'vue-router'
</script>
