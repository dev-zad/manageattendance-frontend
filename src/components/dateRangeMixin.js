export const dateRangeMixin = {
  data() {
    return {
      dateFrom: null,
      dateTo: null,
    };
  },
  methods: {
    searchLogs(logs, dateFrom, dateTo) {
      return logs.filter(log => {
        const fromDate = dateFrom ? new Date(dateFrom) : null;
        const toDate = dateTo ? new Date(dateTo) : null;

        if (fromDate && toDate) {
          const logDate = new Date(log.date);
          return logDate >= fromDate && logDate <= toDate;
        }

        return true;
      });
    },
  },
};
