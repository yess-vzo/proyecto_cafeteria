<template>
    <nav class="navbar">
      <!-- Icono de Inicio -->
      <div class="nav-item" @click="goToHomepage">
        <img src="@/assets/home.svg" alt="Inicio" class="nav-icon" />
        <span>Inicio</span>
      </div>
  
      <!-- Icono de Carrito -->
      <div class="nav-item cart-icon-container" @click="goToCart">
        <img src="@/assets/cart.svg" alt="Carrito" class="nav-icon" />
        <!-- Mostrar el conteo del carrito -->
        <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
      </div>
  
      <!-- Icono de Perfil (si el usuario está autenticado) -->
      <div v-if="isAuthenticated" class="nav-item" @click="goToProfile">
        <img src="@/assets/profile.svg" alt="Perfil" class="nav-icon" />
        <span>Perfil</span>
      </div>
  
      <!-- Icono de Cerrar Sesión (si el usuario está autenticado) -->
      <div v-if="isAuthenticated" class="nav-item" @click="logout">
        <img src="@/assets/logout.svg" alt="Cerrar Sesión" class="nav-icon" />
        <span>Salir</span>
      </div>
  
      <!-- Icono de Login (si el usuario no está autenticado) -->
      <div v-else class="nav-item" @click="goToLogin">
        <img src="@/assets/login.svg" alt="Login" class="nav-icon" />
        <span>Login</span>
      </div>
    </nav>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'NavBar',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      // Computed para verificar autenticación y contar elementos en el carrito
      const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
      const cartItemCount = computed(() => store.getters['cartItemCount']);
  
      // Métodos de navegación
      const goToHomepage = () => {
        router.push('/');
      };
  
      const goToCart = () => {
        router.push('/cart');
      };
  
      const goToLogin = () => {
        router.push('/login');
      };
  
      const goToProfile = () => {
        router.push('/profile');
      };
  
      const logout = () => {
        store.dispatch('auth/logout');
        router.push('/');
      };
  
      return {
        isAuthenticated,
        cartItemCount,
        goToHomepage,
        goToCart,
        goToLogin,
        goToProfile,
        logout,
      };
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(11, 121, 205);
    padding: 5px;
    border-bottom: 1px solid #ddd;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    text-align: center;
    font-size: 0.9rem;
  }
  
  .nav-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
  }
  
  .cart-icon-container {
    position: relative;
  }
  
  .cart-count {
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: #dc3545;
    color: white;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 50%;
  }
  </style>
  