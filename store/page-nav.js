export default {

  state: () => (
    {
      title: undefined,
      showBackButton: false
    }
  ),

  mutations: {

    set(state, object) {

      Object.assign(state, object || {
        title: undefined,
        showBackButton: false
      });

    }

  }

}
