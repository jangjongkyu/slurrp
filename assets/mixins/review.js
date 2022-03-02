export default {

  async asyncData({$axios}) {
    const [todayReviews, monthlyBestReviews] = await Promise.all([$axios.$get('/api/best-review/today'), $axios.$get('/api/best-review/monthly')]);
    return {
      todayReviews,
      monthlyBestReviews
    }
  },


  data() {
    return {
      todayReviews: null,
      monthlyBestReviews: null,
    }
  },
}
