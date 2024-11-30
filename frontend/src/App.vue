<template>
  <div id="app">
    <!-- Barra de Navegación -->
    <NavBar />
    
    <!-- Vista principal -->
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar, // Cambiado de "Navbar" a "AppNavbar"
  },
};
</script>
