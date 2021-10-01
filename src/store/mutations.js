import types from '@/store/types';

export default {
  [types.mutations.STORE_RETRIEVED_DATA]: (state, payload) => {
    state.remote = payload;
  },
  [types.mutations.SET_CURRENT_TEAM]: (state, payload) => {
    state.selectedTeam = payload;
  },
  [types.mutations.SET_CURRENT_DATE]: (state, payload) => {
    state.selectedDate = payload;
  },
  [types.mutations.SET_LOADING]: (state, payload) => {
    state.loading = payload;
  },
  [types.mutations.SET_ERROR]: (state, payload) => {
    state.error = payload;
  },
  [types.mutations.STORE_PRS]: (state, payload) => {
    state.prs = payload;
  },
};
