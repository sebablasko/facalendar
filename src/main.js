import Vue from 'vue';
import VueConfetti from 'vue-confetti';
import moment from 'moment';  
import store from '@/store';

import App from './App.vue';

moment.locale('es');

Vue.use(VueConfetti)

Vue.config.productionTip = false;
Vue.mixin({ store });

new Vue({
  render: (h) => h(App),
}).$mount('#app');
