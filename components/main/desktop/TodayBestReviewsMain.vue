<template>
  <div class="main_st_review_wrap">
    <div v-for="(review, reviewIndex) in reviews" :key="`review-${reviewIndex}`" class="main_st_review">
      <div class="main_review_thum cursor" @click="openReviewAwardModal(review)" :style="{background : 'url(' + getImageUrl(review.mainDlgtImg) +') no-repeat center', 'background-size': 'cover' }" style="cursor:pointer;"></div>
      <today-best-review-swiper-main :review="review"/>
      <div class="main_st_review_text_wrap">
        <figcaption class="figcaption review_text_top bdb_0">
          <nuxt-link :to="`/goods?id=${review.goodsId}`">
            <div class="main_rv_item">
              <div class="name w100 f20">{{ review.goodsName }}</div>
              <review-price-panel :review="review" style="display:none"/>
              
            </div>
          </nuxt-link>
          <a class="cursor" @click="openReviewAwardModal(review)">
            <div class="review_option my" style="display:none">
              <dl>
                <dt><span>컬러 </span></dt>
                <dd><span>{{ $reviewService.colorReview(review.colorReviewCd) }}</span></dd>
              </dl>
              <dl>
                <dt><span>사이즈 </span></dt>
                <dd><span>{{ $reviewService.sizeReview(review.sizeReviewCd) }}</span></dd>
              </dl>
              <dl>
                <dt><span>배송 </span></dt>
                <dd><span>{{ $reviewService.deliveryReview(review.deliveryReviewCd) }}</span></dd>
              </dl>
            </div>

            <div class="review_txt">
              <pre>{{ review.content }}</pre>
            </div>

            <div class="main_rv_write">
              <div class="reviewstatus_wrap fl one" style="display:none">
                <div class="review_star">
                  <span class="star">
                    <i></i>
                  </span>
                  <span class="score">{{ review.avgScore }}</span>
                </div>
                <div class="wish_score">
                  <span class="wish_status"></span><span>{{ review.likeCount }}</span>
                </div>
                <div class="review_star">
                  <span class="rcount">리뷰 <em>{{ review.reviewCount | number }}</em></span>
                </div>
              </div>
              <div class="fl">
                <div class="review_star">
                  <star-rating-viewer :rate="review.score"></star-rating-viewer>
                </div>
              </div>
              <div class="fr">
                <div class="dp_flex">
                  <div class="review_star">
                    <span class="user"><em>{{ review.reviewerEmail | blur  }}</em></span>
                    <span class="mgl15" style="display:none"><em class="txt_s">{{ review.createDate | dateFormat }}</em></span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </figcaption>
      </div>
    </div>
  </div>
</template>
<script>
import StarRatingViewer from '@/components/commons/StarRatingViewer';
import TodayBestReviewSwiperMain from '@/components/main/desktop/TodayBestReviewSwiperMain';
import ReviewPricePanel from '@/components/pages/community/review-award/ReviewPricePanel';
import DesktopReviewAwardModal from '@/components/pages/community/review-award/DesktopReviewAwardModal';

export default {
  name: 'TodayBestReviews',
  components: {ReviewPricePanel, TodayBestReviewSwiperMain, StarRatingViewer},
  props: {
    reviews: {},
  },
  methods: {
    openReviewAwardModal(review) {
      this.$modal.show(
        DesktopReviewAwardModal,
        {
          review
        },
        {
          width: '1100px',
          height: 'auto',
        },
      );
    }
  }
};
</script>
