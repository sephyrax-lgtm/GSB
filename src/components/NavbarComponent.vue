
<template>
  <nav class="navbar">
    <router-link to="/accueil">Accueil</router-link>
    <router-link to="/medecins">Médecins</router-link>
    <router-link to="/rapports">Rapports</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 15px;
  background-color: #243247;
  border-radius: 8px;
  margin-bottom: 25px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar a:hover {
  color: #8ecae6;
}
</style>
