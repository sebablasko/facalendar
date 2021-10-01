import axios from 'axios';

import types from '@/store/types';

export default {
  [types.actions.RETRIEVE_DATA]: (context) => {
    return axios.get(
      'https://users.dcc.uchile.cl/~sblasco/facalendar2/')
      .then((x) => {
        const teamIndex = window.location.search.substring(1) === 'cuprum' ? 1 : 0;
        context.commit(types.mutations.STORE_RETRIEVED_DATA, x.data);
      })
      .then(() => context.commit(types.mutations.SET_LOADING, false))
      .catch((e) => {
        console.error(e);
        context.commit(types.mutations.SET_ERROR, true);
      });
  },
  [types.actions.SET_TEAM]: (context, teamId) => {
    context.commit(types.mutations.SET_LOADING, true)
    const { repos } = context.state.remote.teams.find(x => x.id === teamId);
    return axios.get(`https://users.dcc.uchile.cl/~sblasco/facalendar2/prs.php?repo=${repos.map(x => x.name).join(',')}`)
      .then((x) => context.commit(types.mutations.STORE_PRS, x.data))
      .then(() => context.commit(types.mutations.SET_CURRENT_TEAM, teamId))
      .then(() => context.dispatch(types.actions.SET_THEME))
      .then(() => context.commit(types.mutations.SET_LOADING, false))
      .catch((e) => {
        console.error(e);
        context.commit(types.mutations.SET_ERROR, true);
      });
  },
  [types.actions.SET_THEME]: (context) => {
    document.documentElement.style.setProperty('--primary-color', context.getters.colors.primary);
    document.documentElement.style.setProperty('--light-primary-color-10', context.getters.colors.light10);
    document.documentElement.style.setProperty('--light-primary-color-20', context.getters.colors.light20);
    document.documentElement.style.setProperty('--light-primary-color-30', context.getters.colors.light30);
    document.documentElement.style.setProperty('--light-primary-color-70', context.getters.colors.light70);
    document.documentElement.style.setProperty('--dark-primary-color-10', context.getters.colors.dark10);
    document.documentElement.style.setProperty('--dark-primary-color-20', context.getters.colors.dark20);
    document.documentElement.style.setProperty('--dark-primary-color-30', context.getters.colors.dark30);
  },
};
