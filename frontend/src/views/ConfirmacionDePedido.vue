-- Active: 1731906223338@@localhost@5432
<template>
  <div class="confirmation-page">
    <h2 v-if="!orderConfirmed">Confirmación de Pedido</h2>

    <!-- Formulario de confirmación -->
    <div v-if="!orderConfirmed">
      <!-- Resumen de productos en el carrito -->
      <div class="order-summary">
        <h3>Resumen del Pedido</h3>
        <ul>
          <li v-for="product in cartItems" :key="product.id">
            {{ product.nombre }} - Cantidad: {{ product.quantity }} - Precio: ${{ product.precio * product.quantity }} MXN
          </li>
        </ul>
        <p><strong>Total: ${{ cartTotal }} MXN</strong></p>
      </div>

      <!-- Selección de fecha -->
      <div class="pickup-date">
        <h3>Fecha de Recolección</h3>
        <Datepicker v-model="pickupDate" :disabled-dates="{ from: new Date() }" />
      </div>

      <!-- Selección de hora -->
      <div class="pickup-time">
        <h3>Hora de Recolección</h3>
        <select v-model="pickupTime" required>
          <option v-for="time in availableTimes" :key="time" :value="time">{{ time }}</option>
        </select>
      </div>

      <!-- Botón de Confirmación -->
      <button @click="confirmOrder" :disabled="!pickupDate || !pickupTime">
        Confirmar Pedido
      </button>
    </div>

    <!-- Componente de confirmación del pedido -->
    <order-confirmation
      v-if="orderConfirmed"
      :productos="cartItems"
      :total="cartTotal"
      :fechaHora="formattedPickupDate"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Datepicker from 'vue3-datepicker';
import OrderConfirmation from '../components/OrderConfirmation.vue';

export default {
  name: 'ConfirmacionDePedido',
  components: {
    Datepicker,
    OrderConfirmation,
  },
  setup() {
    const store = useStore();
    const cartItems = computed(() => store.getters.cartItems);
    const cartTotal = computed(() => store.getters.cartTotal);

    // Fecha y hora de recolección
    const pickupDate = ref(null);
    const pickupTime = ref('');

    // Estado para alternar entre la vista y la confirmación
    const orderConfirmed = ref(false);

    // Generar horarios disponibles
    const availableTimes = [
      '6:30 a.m.', '6:45 a.m.', '7:00 a.m.', '7:15 a.m.', '7:30 a.m.',
      '7:45 a.m.', '8:00 a.m.', '8:15 a.m.', '8:30 a.m.', '8:45 a.m.',
      '9:00 a.m.', '9:15 a.m.', '9:30 a.m.', '9:45 a.m.', '10:00 a.m.',
      '10:15 a.m.', '10:30 a.m.', '10:45 a.m.', '11:00 a.m.', '11:15 a.m.',
      '11:30 a.m.', '11:45 a.m.', '12:00 p.m.', '12:15 p.m.', '12:30 p.m.',
      '12:45 p.m.', '1:00 p.m.', '1:15 p.m.', '1:30 p.m.', '1:45 p.m.',
    ];

    // Formatear la fecha y hora para mostrar en el componente de confirmación
    const formattedPickupDate = computed(() =>
      pickupDate.value
        ? `${pickupDate.value.toLocaleDateString()} a las ${pickupTime.value}`
        : ''
    );

    const confirmOrder = () => {
      if (!pickupDate.value || !pickupTime.value) {
        alert('Por favor, selecciona la fecha y hora de recolección.');
        return;
      }

      // Cambiar al estado de confirmación
      store.dispatch('emptyCart'); // Vaciar el carrito después de confirmar el pedido
      orderConfirmed.value = true;
    };

    return {
      cartItems,
      cartTotal,
      pickupDate,
      pickupTime,
      availableTimes,
      orderConfirmed,
      formattedPickupDate,
      confirmOrder,
    };
  },
};
</script>

<style scoped>
.confirmation-page {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.order-summary {
  margin-bottom: 20px;
}

.pickup-date, .pickup-time {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc
}

</style>