<template>
  <figure class="figure mgb20">
    <div class="review_img_wrap mainbest">

      <!-- 신규작업 -->
      <div class="main_best_rv_wrap">

        
        <div class="main_best_rv" @click="openReviewAwardModal(review1)">
          <div class="thum" :style="{background : 'url(' + getImageUrl(review1.mainDlgtImg) +') no-repeat center', 'background-size': review1.backgroundType}" style="cursor:pointer;"></div>
          <div class="content">
            <div class="title">{{ review1.goodsName }}</div>
            <div class="text">{{ review1.content }}</div>
            <div class="writer">
              <div class="fl">
                <div class="review_star">
                  <div class="review_star">
                    <span class="star"><i :style="{width: (review1.score * 20) + '%'}"></i></span>
                  </div>
                </div>
              </div>
              <div class="fr"><em>{{ review1.reviewerEmail | blur  }}</em></div>
            </div>
          </div>
        </div>


        <div class="main_best_rv" @click="openReviewAwardModal(review2)">
          <div class="thum" :style="{background : 'url(' + getImageUrl(review2.mainDlgtImg) +') no-repeat center', 'background-size': review2.backgroundType}" style="cursor:pointer;"></div>
          <div class="content">
            <div class="title">{{ review2.goodsName }}</div>
            <div class="text">{{ review2.content }}</div>
            <div class="writer">
              <div class="fl">
                <div class="review_star">
                  <div class="review_star">
                    <span class="star"><i :style="{width: (review1.score * 20) + '%'}"></i></span>
                  </div>
                </div>
              </div>
              <div class="fr"><em>{{ review2.reviewerEmail | blur  }}</em></div>
            </div>
          </div>
        </div>


      </div>
      <!-- //신규작업 -->

    </div>
    
    <!--figcaption class="figcaption">
      <div class="name">{{ review1.goodsName }}</div>
      <review-price-panel :review="review1" />
      
      <div class="price">
        <del class="origin">{{ review.saleAmt | number }}</del>
        <span class="saled">{{ review.saleAmt - review.prmtDcAmt | number }}</span>
        <span class="percent">{{ [review.saleAmt, review.prmtDcAmt] | discountRate }}</span>
      </div>
      
      <div class="reviewstatus_wrap one">
        <div class="review_star">
          <span class="star"><i></i></span>
          <span class="score">{{ formatScore(review1.avgScore) }}</span>
          <span class="rcount">(<em>{{ formatCnt(review1.reviewCount) }}</em>)</span>
        </div>
        <div class="wish_score">
          <span class="wish_status"></span>
          <span>{{ formatCnt(review1.likeCount) }}</span>
        </div>
      </div>
    </figcaption-->
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
    /*
    review: {
      type: Object
    },
    */
    reviews: {
      type: Array
    }
  },

  extends: DesktopTodayBestReviewSwiper,

  mounted() {
    if(this.reviews) {
      if(this.reviews.length > 0) {
        this.review1 = this.reviews[0];
      }
      if(this.reviews.length > 1) {
        this.review2 = this.reviews[1];
      }
    }
  },

  data: () => ({
    swiperOptions: {
      slidesPerView: 2.5,
      slidesPerGroup: 1,
      spaceBetween: 1,
    },
    review1: {},
    review2: {}
  }),

  methods: {
    openReviewAwardModal(review) {
      this.$modal.show(ReviewDetailModal, {
        review: review
      }, {
        width: "100%",
        height: "100%"
      });
    },

    updateReviews(parentReviews) {
      if(parentReviews) {
        if(parentReviews.length > 0) {
          this.review1 = parentReviews[0];
          this.review1.backgroundType = 'cover'
        }
        if(parentReviews.length > 1) {
          this.review2 = parentReviews[1];
          this.review2.backgroundType = 'cover'
        }
      }
    }

  }
}
</script>
