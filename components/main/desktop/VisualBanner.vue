<template>
  <div class="main_vi">
    <!-- Swiper -->
    <client-only>
      <swiper
        ref="swiperOptions"
        :options="banners.length == 1 ? Object.assign(swiperOptions, { init:false}) : swiperOptions"
      >
        <swiper-slide
          v-for="(banner, bannerIndex) in banners"
          :key="`banner-${bannerIndex}`"
        >
          <a :href="getUrl(banner.bnrLinkUrl)" >
            <div class="main_vi_text">
              <h3 v-if="banner.bnrText" v-html-custom="banner.bnrText"></h3>
              <h4 v-if="banner.bnrHtml" v-html-custom="banner.bnrHtml"></h4>
            </div>
            <img :src="getImageUrl(banner.bnrImgPath)"  onerror="this.src='/images/no-img.jpg'" alt="" />
          </a>
        </swiper-slide>
        <div
          slot="pagination"
          class="swiper-pagination visual-swiper-pagination"
        />
      </swiper>
    </client-only>
    <!-- //Swiper -->
  </div>
</template>

<script>
import banner from '@/components/main/banner';
import Formatter from "@/assets/mixins/formatter";

export default {
  name: "VisualBanner",
  mixins: [banner, Formatter],
  mounted() {
    // console.log(this.$route);
  },
  data() {
    return {
      swiperOptions: {
        spaceBetween: 0,
        speed : 1000,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.visual-swiper-pagination',
          clickable: true,
        },
        initialSlide: this.$route.meta.initialSlide || 0,
      },
    }
  },
};
</script>

<style></style>
