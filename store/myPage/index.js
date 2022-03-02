export const state = () => ({
  confirmedPassword: false
});
//
// export const getters = {
//   isConfirmed: state => {
//     return state.confirmedPassword != null;
//   }
// };

export const mutations = {
  setConfirmedPassword(state, confirmed) {
    state.confirmedPassword = confirmed;
  }
};
