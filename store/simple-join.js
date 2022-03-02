export default {

  state: () => (
    {
      details: undefined,
      refreshToken: undefined
    }
  ),

  mutations: {

    set(state, object) {
      state.details = object.details;
      state.refreshToken = object.refreshToken;
    },

    clear(state) {
      state.details = undefined;
      state.refreshToken = undefined;
    }

  }

}
