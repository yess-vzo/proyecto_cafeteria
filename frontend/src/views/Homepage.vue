<template>
  <div class="home-page">
    <!-- Barra de Navegación -->
   

    <!-- Hero Section con Imagen de Fondo -->
    <img class="hero-section" src="@/assets/banner-img.png" />

    <!-- Filas de Productos por Categoría -->
    <div class="product-section">
      <!-- Bebidas Calientes -->
      <div v-if="hotDrinks.length" class="category-section">
        <h2>Bebidas Calientes</h2>
        <div class="product-row">
          <ProductCard
            v-for="product in hotDrinks"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </div>

      <!-- Bebidas Frías -->
      <div v-if="coldDrinks.length" class="category-section">
        <h2>Bebidas Frías</h2>
        <div class="product-row">
          <ProductCard
            v-for="product in coldDrinks"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </div>

      <!-- Alimentos -->
      <div v-if="foods.length" class="category-section">
        <h2>Alimentos</h2>
        <div class="product-row">
          <ProductCard
            v-for="product in foods"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </div>

      <!-- Postres -->
      <div v-if="desserts.length" class="category-section">
        <h2>Postres</h2>
        <div class="product-row">
          <ProductCard
            v-for="product in desserts"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    ProductCard,
  },
  computed: {
    ...mapGetters(['cartItemCount']), // Mapea el getter para obtener la cantidad total en el carrito
  },
  data() {
    return {
      hotDrinks: [],
      coldDrinks: [],
      foods: [],
      desserts: [],
    };
  },
  methods: {
    ...mapActions(['addProductToCart']), // Mapea la acción de Vuex para agregar productos al carrito
    async fetchProductsByCategory(category, stateProperty) {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${category}`);
        this[stateProperty] = response.data;
      } catch (error) {
        console.error(`Error al obtener productos de la categoría ${category}:`, error);
      }
    },
    addToCart(product) {
      this.addProductToCart(product); // Usa la acción de Vuex para agregar al carrito
      console.log('Producto añadido al carrito:', product);
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToCart() {
      this.$router.push('/cart');
    }
  },
  async created() {
    await this.fetchProductsByCategory('Bebidas Calientes', 'hotDrinks');
    await this.fetchProductsByCategory('Bebidas Frías', 'coldDrinks');
    await this.fetchProductsByCategory('Alimentos', 'foods');
    await this.fetchProductsByCategory('Postres', 'desserts');
  },
};
</script>

<style scoped>
/* Estilos para la Barra de Navegación */




.nav-icons {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 10;
  
}


.nav-icon {
  width: 24px;
  cursor: pointer;
}

/* Hero Section con Imagen de Fondo Fija */
.hero-section {

  max-width: 100%;
  height: auto;


}



/* Sección de Productos */
.product-section {
  margin-top: 20px; /* Espacio para la barra de navegación y el hero section */
  padding: 20px;
}

.category-section {
  margin-bottom: 30px;
}

.product-row {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 20px;
  padding: 10px 0;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}
</style>
