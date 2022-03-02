import ReviewService from '@/plugins/review/service';
//import Vue from 'vue';

export default (context, inject) => {
  const reviewService = new ReviewService(context.$axios);
  /*
  Vue.use({
    install: (Vue, options) => {
      Vue.prototype.$reviewService = reviewService;
    }
  });
  */
  context.$reviewService = reviewService;
  inject('reviewService', reviewService);
};



