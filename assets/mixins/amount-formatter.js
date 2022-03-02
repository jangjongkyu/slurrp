import numeral from "numeral";

export default {
  methods: {
    formatAmount(value) {
      return numeral(value).format("0,0");
    },

    formatPercent(value) {
      return numeral(value).format("0.0%");
    },
  },
};
