import Vue from 'vue';
import VueConfetti from 'vue-confetti';

import App from './App.vue';
import { firestorePlugin } from 'vuefire';

Vue.use(VueConfetti)
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
