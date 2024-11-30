const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true, // Activa la API de opciones de Vue (opcional)
        __VUE_PROD_DEVTOOLS__: false, // Desactiva las herramientas de desarrollo en producción
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false // Desactiva la advertencia de mismatch de hidratación
      })
    ]
  }
});
