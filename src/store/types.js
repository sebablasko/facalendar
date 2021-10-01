export default {
  actions: {
    RETRIEVE_DATA: 'retrieveData',
    SET_THEME: 'setTheme',
    SET_TEAM: 'setTeam',
  },
  mutations: {
    STORE_RETRIEVED_DATA: 'storeRetrievedData',
    SET_CURRENT_TEAM: 'setCurrentTeam',
    SET_CURRENT_DATE: 'setCurrentDate',
    SET_LOADING: 'setLoading',
    SET_ERROR: 'setError',
    STORE_PRS: 'storePrs',
  },
  getters: {
    CEREMONIES: 'ceremonies',
    MEMBERS: 'members',
    COLORS: 'colors',
  },
};