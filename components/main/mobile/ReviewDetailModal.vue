<template>

  <div id="wrap">
    <!-- Header -->
    <header class="header_wrap">
      <nav class="header_pop">
        <a href="" class="bt_closeall" @click.prevent="$emit('close')">닫기</a>
      </nav>
    </header>
    <!--// Header -->
    <!-- Container -->
    <main class="contents">
      <section>
        <!-- 상품 -->
        <div class="bg_gray mar_set mgb20">
          <div class="order_list mgb0">
            <nuxt-link :to="`/goods?id=${review.goodsId}`">
              <figure class="figure">
                <div class="thumnail">
                  <img :src="getImageUrl(review.goodsImg)" onerror="this.src='/images/no-img.jpg'" />
                </div>
                <figcaption class="figcaption">
                  <div class="name">{{ review.goodsName }}</div>
                  <review-price-panel :review="review" />
                  <div class="reviewstatus_wrap one">
                    <div class="review_star">
                      <span class="star"><i></i></span>
                      <span class="score">{{ formatScore(review.avgScore) }}</span>
                      <span class="rcount">(<em>{{ formatCnt(review.reviewCount) }}</em>)</span>
                    </div>
                    <div class="wish_score">
                      <span class="wish_status"></span><span>{{ review.likeCount }}</span>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </nuxt-link>
          </div>
        </div>
        <!--// 상품 -->
        <!-- 상품평 -->
        <div class="award_box">
          <div class="awrard_contens">
            <ul class="board_list bdn">
              <li class="bdbn">
                <div class="board_header">
                  <!-- 리뷰 이미지 영역 -->
                  <div class="review_img_wrap monthly">
                    <!-- Swiper image -->
                    <client-only>
                      <swiper :options="swiperOptions" class="review">
                        <swiper-slide v-for="(image, idx) in review.images" :key="`todayBest-${idx}`">
                          <a href="" @click.prevent="doNothing()">
                            <!-- 팝업 열림 -->
                            <div class="review_img_box">
                              <img
                                class="review_img"
                                :src="getImageUrl(image.imgPath)"
                                onerror="this.src='/images/no-img.jpg'"
                                style="object-fit: contain;"
                              />
                            </div>
                          </a>
                        </swiper-slide>
                      </swiper>
                    </client-only>
                    <!--// Swiper image -->
                  </div>
                  <!--// 리뷰 이미지 영역 -->
                </div>
                <div class="board_detail bdr_b15">
                  <div class="comm">
                    <div class="dp_flex">
                      <div class="review_star">
                        <star-rating-viewer :rate="review.score"></star-rating-viewer>
                        <span class="user mgr0"><em>{{ review.reviewerEmail | blur  }}</em></span>
                      </div>
                      <div class="tr">
                        <span class="date">{{ review.createDate | dateFormat }}</span>
                      </div>
                    </div>
                    <div class="review_option my">
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
                    <!--
                    <div class="option_txt">
                      <span>Black <em>(color)</em></span> /
                      <span>Free <em>(size)</em></span>
                    </div>
                    -->
                  </div>
                  <div class="review_txt">
                    <pre>{{ review.content }}</pre>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--// 상품평 -->
      </section>
    </main>
    <!-- Container -->
  </div>
</template>

<script>
import StarRatingViewer from '@/components/commons/StarRatingViewer';
import ReviewPricePanel from '@/components/pages/community/review-award/ReviewPricePanel';

export default {
  props: {
    review: Object
  },

  components: { StarRatingViewer, ReviewPricePanel },

  data: () => ({
    swiperOptions: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 1,
    }
  }),

  methods: {
    doNothing() {

    }
  }
};
</script>
