
<template>
  <main class="rapports">
    <NavbarComponent />

    <h1>Mes rapports de visite</h1>

    <p>Consulter et gérer mes rapports de visite.</p>
  </main>
</template>

<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
</script>

<style scoped>
.rapports {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  color: #243247;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
}
</style>
