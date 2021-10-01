import Vue from 'vue';
import VueConfetti from 'vue-confetti';
import moment from 'moment';  
import store from '@/store';

import App from './App.vue';
import { firestorePlugin } from 'vuefire';

moment.locale('es');

Vue.use(VueConfetti)
Vue.use(firestorePlugin);

Vue.config.productionTip = false;
Vue.mixin({ store });

new Vue({
  render: (h) => h(App),
}).$mount('#app');
