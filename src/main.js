import Vue from 'vue';
import App from './App.vue';
import VueAuthenticate from 'vue-authenticate'

import vuetify from './plugins/vuetify';
import './plugins/infinite-scroll';
import authenticateConfig from './authenticate';
import router from './router'
import store from './store'
import './services';

Vue.use(VueAuthenticate, authenticateConfig);

Vue.config.productionTip = false;

Vue.config.errorHandler = function (err) {
  console.error(err);
};

const vue = new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
window.$vue = vue;