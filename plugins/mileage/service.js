export default class MileageService {
  constructor($axios) {
    this.$axios = $axios;
  }

  getSummary() {
    return this.$axios.$get('/api/my-page/points/summary');
  }

  find(params) {
    return this.$axios.$get('/api/my-page/points', {
      params
    })
  }
}





