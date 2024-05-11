// store.js
import { createStore } from 'vuex';
import { logs as originalLogs } from '@/components/logs'; // replace './path/to/logs' with the correct path to logs.js

export default createStore({
  state: {
    logs: [...originalLogs],
    dateRange: { start: null, end: null },
  },
  created() {
    console.log(this.state.logs);
  },
  mutations: {
    setDateRange(state, dateRange) {
      state.dateRange = dateRange;
      console.log(state.dateRange);
    },
    filterLogs(state) {
      let filteredLogs;
      if (state.dateRange.start && state.dateRange.end) {
        filteredLogs = originalLogs.filter(log => new Date(log.date) >= new Date(state.dateRange.start) && new Date(log.date) <= new Date(state.dateRange.end));
      } else {
        filteredLogs = [...originalLogs];
      }
      state.logs = filteredLogs;
      console.log(state.logs);
    },
  },
});