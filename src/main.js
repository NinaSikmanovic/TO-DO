import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';  // Import Vuetify CSS
import './validations/validations';
import store from "../store";

Vue.use(Vuetify);

Vue.config.productionTip = false;

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
});

new Vue({
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app');
