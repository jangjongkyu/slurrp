export default {
  state: () => ({
    id: undefined,
  }),

  mutations: {
    set(state, id) {
      state.id = id;
    },
  },
};
