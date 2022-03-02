<template>
  <div class="main_banner_wrap">
    <!-- Swiper -->
    <client-only>
      <swiper
        :options="banners.length == 1 ? Object.assign(swiperOptions, { init:false}) : swiperOptions"
        class="mainToday"
      >
        <swiper-slide
          v-for="(banner, bannerIndex) in banners"
          :key="`banner-${bannerIndex}`"
        >
          <a :href="getUrl(banner.bnrLinkUrl)" >
            <figure class="figure">
              <div class="thumbnail">
                <img :src="getImageUrl(banner.bnrMobileImgPath)"  onerror="this.src='/images/no-img.jpg'" alt="" />
              </div>
              <figcaption class="figcaption">
                <div class="title" v-html-custom="banner.bnrText"></div>
                <div class="copy">
                  <pre v-html-custom="banner.bnrHtml"></pre>
                </div>
              </figcaption>
            </figure>
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
  data() {
    return {
      swiperOptions: {
        initialSlide: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.visual-swiper-pagination',
          clickable: true,
        },
      },
    }
  },
};
</script>

<style></style>
