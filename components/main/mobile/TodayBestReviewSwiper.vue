<template>
  <figure class="figure mgb20">
    <div class="review_img_wrap mainbest">
      <!-- Swiper -->
      <client-only>
        <swiper :options="swiperOptions" class="review">
          <swiper-slide v-for="(image, idx) in images" :key="`todayBest-${idx}`">
            <nuxt-link :to="`/goods?id=${review.goodsId}`" v-if="isProductImage(image)">
              <!-- 팝업 열림 -->
              <div class="review_img_box">
                <img class="review_img" :src="getImageUrl(image)" onerror="this.src='/images/no-img.jpg'" />
              </div>
            </nuxt-link>
            <a v-else class="cursor" @click="openReviewAwardModal">
              <div class="review_img_box">
                <img class="review_img" :src="getImageUrl(image)" onerror="this.src='/images/no-img.jpg'" />
              </div>
            </a>
          </swiper-slide>
        </swiper>
      </client-only>
      <!-- //Swiper -->
    </div>
    <figcaption class="figcaption">
      <div class="name">{{ review.goodsName }}</div>
      <review-price-panel :review="review" />
      <!--
      <div class="price">
        <del class="origin">{{ review.saleAmt | number }}</del>
        <span class="saled">{{ review.saleAmt - review.prmtDcAmt | number }}</span>
        <span class="percent">{{ [review.saleAmt, review.prmtDcAmt] | discountRate }}</span>
      </div>
      -->
      <div class="reviewstatus_wrap one">
        <div class="review_star">
          <span class="star"><i></i></span>
          <span class="score">{{ formatScore(review.avgScore) }}</span>
          <span class="rcount">(<em>{{ formatCnt(review.reviewCount) }}</em>)</span>
        </div>
        <div class="wish_score">
          <span class="wish_status"></span>
          <span>{{ formatCnt(review.likeCount) }}</span>
        </div>
      </div>
    </figcaption>
  </figure>
</template>

<script>
import Formatter from "@/assets/mixins/formatter";
import ReviewDetailModal from "./ReviewDetailModal";
import ReviewPricePanel from '@/components/pages/community/review-award/ReviewPricePanel';
import DesktopTodayBestReviewSwiper from '@/components/main/desktop/TodayBestReviewSwiper';

export default {
  mixins: [ Formatter ],

  components: { ReviewPricePanel },

  props: {
    review: {
      type: Object
    }
  },

  extends: DesktopTodayBestReviewSwiper,

  data: () => ({
    swiperOptions: {
      slidesPerView: 2.5,
      slidesPerGroup: 1,
      spaceBetween: 1,
    }
  }),

  created() {},

  methods: {
    openReviewAwardModal() {
      this.$modal.show(ReviewDetailModal, {
        review: this.review
      }, {
        width: "100%",
        height: "100%"
      });
    }
  }
}
</script>
