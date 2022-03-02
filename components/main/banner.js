export default {
  async fetch() {
    await this.fetchBanners();
  },
  props: {
    category: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      banners: [],
    };
  },
  methods: {
    async fetchBanners() {
      this.banners = await this.$axios.$get(`/api/main/${this.category.categoryNo}/banners`);
    },
  },
};
