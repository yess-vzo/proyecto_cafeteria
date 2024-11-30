import { createStore } from 'vuex';
import auth from './modules/auth'; // Módulo de autenticación

const store = createStore({
  state() {
    return {
      cart: [] // Estado inicial para el carrito
    };
  },
  mutations: {
    addToCart(state, product) {
      // Buscar si el producto ya está en el carrito
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        // Si el producto ya existe, incrementa o decrementa la cantidad
        existingProduct.quantity += product.quantity || 1;
        // Si la cantidad es menor o igual a 0, elimina el producto del carrito
        if (existingProduct.quantity <= 0) {
          state.cart = state.cart.filter(item => item.id !== product.id);
        }
      } else {
        // Si no existe, agrega el producto con cantidad inicial
        state.cart.push({ ...product, quantity: product.quantity || 1 });
      }
    },
    clearCart(state) {
      state.cart = []; // Vacía el carrito
    },
    removeItemFromCart(state, product) {
      // Elimina completamente el producto del carrito
      state.cart = state.cart.filter(item => item.id !== product.id);
    },
  },
  actions: {
    addProductToCart({ commit }, product) {
      // Llama a la mutación para agregar o actualizar la cantidad en el carrito
      commit('addToCart', product);
    },
    emptyCart({ commit }) {
      // Llama a la mutación para vaciar el carrito
      commit('clearCart');
    },
    removeProductFromCart({ commit }, product) {
      // Llama a la mutación para eliminar un producto específico del carrito
      commit('removeItemFromCart', product);
    },
  },
  getters: {
    cartItems: (state) => state.cart,
    cartTotal: (state) =>
      // Calcula el total sumando los precios de los productos en el carrito
      state.cart.reduce((total, item) => total + (Number(item.precio) * item.quantity), 0),
    cartItemCount: (state) =>
      // Calcula la cantidad total de productos en el carrito
      state.cart.reduce((total, item) => total + item.quantity, 0),
  },
  modules: {
    auth // Módulo de autenticación
  }
});

export default store;
