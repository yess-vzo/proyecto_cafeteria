<template>
  <div class="card">
    <div class="image-placeholder"></div>
    <div class="details">
      <div class="product-info">
        <span class="product-name">{{ product.nombre }}</span>
        <div class="quantity">
          <button class="decrease" @click="decreaseQuantity">-</button>
          <span class="quantity-number">{{ quantity }}</span>
          <button class="increase" @click="increaseQuantity">+</button>
        </div>
      </div>
      <div class="price-add">
        <span class="price">${{ product.precio }} MXN</span>
        <button class="add-button" @click="addToCart">Añadir</button> <!-- Usa addToCart -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    increaseQuantity() {
      this.quantity += 1;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity -= 1;
    },
    ...mapActions(['addProductToCart']),
    addToCart() { // Cambiado a addToCart
      // Llama a la acción de Vuex para añadir el producto al carrito
      this.addProductToCart({ ...this.product, quantity: this.quantity });
      this.quantity = 1; // Restablece la cantidad después de agregar al carrito
    },
  },
};
</script>


<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

.card {
    width: 280px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.image-placeholder {
    width: 100%;
    height: 120px;
    background-color: #ddd;
}

.details {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.product-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}

.product-name {
    font-size: 14px;
    font-weight: bold;
    color: #333;
}

.quantity {
    display: flex;
    align-items: center;
    gap: 4px;
}

button {
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 14px;
}

.decrease, .increase {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    border-radius: 50%;
}

.quantity-number {
    font-size: 14px;
}

.price-add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.price {
    font-size: 14px;
    color: #888;
}

.add-button {
    width: 60px;
    padding: 5px;
    background-color: #ccc;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
}
</style>
