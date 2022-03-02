<template>
  <div class="main_st_review_img_wrap">
    <!-- Swiper -->
    <client-only>
      <swiper :options="swiperOptions" class="item_slide" style="display:none">
        <swiper-slide
          v-for="(image, idx) in images"
          :key="`todayBest-${idx}`"
          class="main_st_review_img"
        >
          <nuxt-link :to="`/goods?id=${review.goodsId}`" v-if="isProductImage(image)">
            <img
              :src="getImageUrl(image)"
              onerror="this.src='/images/no-img.jpg'"
            />
          </nuxt-link>
          <a v-else class="cursor" @click="openReviewAwardModal">
            <img
              :src="getImageUrl(image)"
              onerror="this.src='/images/no-img.jpg'"
            />
          </a>
        </swiper-slide>
        <div
          v-show="images.length > 3"
          class="swiper-button-next bt_right"
          slot="button-next"
        >
          <img src="/web/images/icon_next.png" alt="다음">
        </div>
        <div
          v-show="images.length > 3"
          class="swiper-button-prev bt_left"
          slot="button-prev"
        >
          <img src="/web/images/icon_prev.png" alt="이전">
        </div>
      </swiper>
    </client-only>
    <!-- //Swiper -->
  </div>
</template>

<script>
import Formatter from "@/assets/mixins/formatter";
import DesktopReviewAwardModal from '@/components/pages/community/review-award/DesktopReviewAwardModal';

export default {
  name: 'TodayBestReviewSwiper',

  mixins: [Formatter],
  props: {
    review: {
      type: Object
    }
  },
  computed: {
    images() {
      return [...(this.review.images || []).map(img => img.imgPath), ...this.review.goodsImages];
    }
  },
  methods: {
    isProductImage(image) {
      return this.review.goodsImages.includes(image);
    },
    openReviewAwardModal() {
      this.$modal.show(
        DesktopReviewAwardModal,
        {
          review: this.review,
        },
        {
          width: '1100px',
          height: 'auto',
        },
      );
    }
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: "auto",
      spaceBetween: 0,
      navigation: {
        nextEl: '.bt_right',
        prevEl: '.bt_left',
      },
    }
  }),
}
</script>
<style scoped>
 a {
   cursor: pointer;
 }
</style>
