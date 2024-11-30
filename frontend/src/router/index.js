import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../views/Homepage.vue';
import CarritoDeCompra from '../views/CarritoDeCompra.vue';
import ConfirmacionDePedido from '../views/ConfirmacionDePedido.vue';
import Login from '../views/Login.vue';  
import Register from '../views/Register.vue'; 
import store from '../store'; // Importamos el store para verificar la autenticación

const routes = [
  { path: '/', name: 'Homepage', component: Homepage },
  { path: '/cart', name: 'CarritoDeCompra', component: CarritoDeCompra },
  {  path: '/confirmacion-pedido', name: 'ConfirmacionDePedido', component: ConfirmacionDePedido,
    meta: { requiresAuth: true } // Esta ruta requiere autenticación
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      // Redirige al login y agrega la ruta de destino en la query
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next(); // El usuario está autenticado, permitir el acceso
    }
  } else {
    next(); // La ruta no requiere autenticación
  }
});

export default router;
