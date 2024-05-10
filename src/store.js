// store.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    logs: [

    ],
    sidebarDateFrom: null,
    sidebarDateTo: null,
  },
  mutations: {
    setSidebarDateFrom(state, date) {
      state.sidebarDateFrom = date;
    },
    setSidebarDateTo(state, date) {
      state.sidebarDateTo = date;
    },
  },
  actions: {
    updateSidebarDateRange({ commit }, { fromDate, toDate }) {
      commit('setSidebarDateFrom', fromDate);
      commit('setSidebarDateTo', toDate);
    },
  },
  getters: {
    sidebarDateFrom(state) {
      return state.sidebarDateFrom;
    },
    sidebarDateTo(state) {
      return state.sidebarDateTo;
    },
  },
});
