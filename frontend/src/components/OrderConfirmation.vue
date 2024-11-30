<template>
    <div class="order-confirmation">
      <h2>¡Pedido Confirmado!</h2>
      <p><strong>Fecha y hora de recolección:</strong> {{ fechaHora }}</p>
     
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'OrderConfirmation',
    props: {
      productos: {
        type: Array,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      fechaHora: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .order-confirmation {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  h2 {
    color: #5cb85c;
  }
  
  .order-details {
    margin-top: 20px;
  }
  
  .order-details ul {
    list-style: none;
    padding: 0;
  }
  
  .order-details li {
    margin: 5px 0;
  }
  
  strong {
    color: #333;
  }
  </style>
  