<template>
  <div class="main_st">
    <h4 class="main_st_title">
      오늘의 베스트 리뷰 <span class="fa_l">고객님들의 따끈따끈한 착용소감!</span>
    
      <nuxt-link
        :to="{path:'/community/review-award'}"
        class="bt_arr3"
        >
        더보기
      </nuxt-link>
    </h4>
    <TodayBestReviewsMain :reviews="reviews"/>
  </div>
</template>

<script>
// import TodayBestReviews from "./TodayBestReviewSwiper.vue";
import TodayBestReviewsMain from '@/components/main/desktop/TodayBestReviewsMain';

export default {
    name: "ReviewList",
    components: {
      TodayBestReviewsMain
    },
    props: {},
    mounted() {
      this.asyncData();
    },

    methods: {
      async asyncData() {
        this.reviews = await this.$axios.$get('/api/best-review/today', {params: { count: 4 }});
      },
    },

    data: () => ({
      reviews: {}
    }),

  };

</script>
