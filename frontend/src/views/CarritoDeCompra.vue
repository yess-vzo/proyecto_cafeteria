<template>
  <div class="cart-page">
    <h1>Carrito de Compras</h1>
    <div v-if="cartItems.length" class="cart-items">
      <!-- Cada producto en el carrito -->
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <span class="item-name">{{ item.nombre }}</span>
        
        <!-- Controles para cambiar la cantidad -->
        <div class="quantity-controls">
          <button @click="decreaseQuantity(item)">-</button>
          <span class="item-quantity">{{ item.quantity }}</span>
          <button @click="increaseQuantity(item)">+</button>
        </div>

        <!-- Precio total por producto y botón de eliminación -->
        <span class="item-total">Total: ${{ (item.precio * item.quantity).toFixed(2) }} MXN</span>
        <button @click="removeFromCart(item)" class="remove-button">Eliminar</button>
      </div>
      
      <!-- Resumen del carrito y opciones de vaciar o regresar -->
      <div class="cart-summary">
        <p class="total">Total a pagar: ${{ cartTotal }} MXN</p>
        <button @click="clearCart" class="clear-cart">Vaciar Carrito</button>
        <button @click="goToMenu" class="back-to-menu">Regresar al Menú</button>
      </div>

      <!-- Botón para confirmar compra y proceder a la confirmación de pedido -->
      <div class="checkout">
        <button @click="goToConfirmation" class="confirm-order">Confirmar Compra</button>
      </div>
    </div>
    <div v-else>
      <p>El carrito está vacío.</p>
      <button @click="goToMenu" class="back-to-menu">Regresar al Menú</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CarritoDeCompra',
  computed: {
    ...mapGetters(['cartItems', 'cartTotal']),
  },
  methods: {
    ...mapActions(['addProductToCart', 'emptyCart']),
    
    increaseQuantity(item) {
      this.addProductToCart({ ...item, quantity: 1 });
    },
    
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.addProductToCart({ ...item, quantity: -1 });
      } else {
        this.removeFromCart(item);
      }
    },
    
    removeFromCart(item) {
      this.$store.commit('removeItemFromCart', item);
    },
    
    clearCart() {
      this.emptyCart();
    },
    
    goToMenu() {
      this.$router.push('/');
    },

    goToConfirmation() {
      // Verifica si el usuario está autenticado antes de proceder
      if (this.$store.getters['auth/isAuthenticated']) {
        this.$router.push('/confirmacion-pedido');
      } else {
        this.$router.push('/login?redirect=/confirmacion-pedido');
      }
    }
  },
};
</script>

<style scoped>
.cart-page {
  padding: 20px;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.item-name {
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-quantity {
  font-size: 1rem;
  width: 24px;
  text-align: center;
}

.remove-button, .clear-cart, .back-to-menu, .confirm-order {
  background-color: #d9534f;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover, .clear-cart:hover, .back-to-menu:hover, .confirm-order:hover {
  background-color: #c9302c;
}

.cart-summary {
  text-align: right;
  font-size: 1.2rem;
  margin-top: 20px;
}

.total {
  font-weight: bold;
  color: #333;
}

.clear-cart {
  background-color: #d9534f;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-cart:hover {
  background-color: #c9302c;
}

.back-to-menu {
  background-color: #5bc0de;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-to-menu:hover {
  background-color: #31b0d5;
}

.checkout {
  margin-top: 20px;
  text-align: right;
}

.confirm-order {
  background-color: #5cb85c;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-order:hover {
  background-color: #4cae4c;
}
</style>
