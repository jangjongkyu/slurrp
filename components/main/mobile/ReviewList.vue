<template>
  <div class="main_todayReview_wrap">
    <h4 class="title_main inner">
      오늘의 베스트 리뷰
      <nuxt-link
        :to="{path:'/community/review-award'}"
        class="bt_arr2 w0 mgt5"
        >
        더보기
      </nuxt-link>
      <br/>
      <span>고객님의 따끈따끈한 착용소감</span>
    </h4>
    <div class="main_todayReview_box">
      <ul class="item_list">
        <!--li v-for="(review, reviewIndex) in reviews" :key="`review-${reviewIndex}`" class="single">
          <TodayBestReviewSwiperMain :review="review" />
        </li-->

        <!-- 상단 2개 -->
        <li class="single">
          <TodayBestReviewSwiperMain ref="reviewTop" :reviews="reviewsTop" />
        </li>

        <!-- 하단 2개 -->
        <li class="single">
          <TodayBestReviewSwiperMain ref="reviewBottom" :reviews="reviewsBottom" />
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import TodayBestReviewSwiperMain from "./TodayBestReviewSwiperMain.vue";

  export default {
    name: "ReviewList",
    components: {
      TodayBestReviewSwiperMain
    },
    props: {},
/*
    created() {
      this.asyncData();
    },
    */
    mounted() {
      this.asyncData();
    },
    

    methods: {
      async asyncData() {
        const reviewList = await this.$axios.$get('/api/best-review/today', {params: { count: 4 }});
        this.reviews = reviewList;

        for(var i = 0 ; i < this.reviews.length ; i++) {
          if(i < 2 ) {
            this.reviewsTop.push(this.reviews[i]);
          } else if(i < 4){
            this.reviewsBottom.push(this.reviews[i]);
          }
        }

        this.$refs.reviewTop.updateReviews(this.reviewsTop);
        this.$refs.reviewBottom.updateReviews(this.reviewsBottom);
        
      },
    },

    data: () => ({
      reviews: {},
      reviewsTop: [],
      reviewsBottom: []
    }),
  };

</script>
