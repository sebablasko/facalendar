import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

import actions from '@/store/actions';
import mutations from '@/store/mutations';
import getters from '@/store/getters';

Vue.use(Vuex);

const state = {
    selectedDate: moment(),
    selectedTeam: undefined,
    remote: undefined,
    loading: true,
    error: undefined,
    prs: [],
};

export default new Vuex.Store({
  state,
  actions,
  mutations: {
    ...mutations,
  },
  getters: {
    ...getters,
  },
});