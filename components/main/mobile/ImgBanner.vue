<template>
  <div class="main_todayPromotion_wrap">
    <h4 class="title_main inner">
      오늘의 기획전 
      <nuxt-link
        :to="{path:'/promotion'}"
        class="bt_arr2 w0 mgt5"
        >
        더보기
      </nuxt-link>
      <br/>
      <span>풍성한 혜택과 추천</span>
    </h4>
    <!-- Swiper -->
    <client-only>
      <swiper :options="swiperOptions" class="item_slide todayPromotion">
        <swiper-slide
          v-for="(banner, bannerIndex) in banners"
          :key="`banner-${bannerIndex}`"
        >
          <a :href="getUrl(banner.bnrLinkUrl)">
            <div class="thumnail">
              <img :src="getImageUrl(banner.bnrMobileImgPath)" onerror="this.src='/images/no-img.jpg'" alt="" />
            </div>
          </a>
        </swiper-slide>
      </swiper>
    </client-only>
    <!-- //Swiper -->
  </div>
</template>

<script>
import banner from '@/components/main/banner';
import Formatter from "@/assets/mixins/formatter";

export default {
  name: "ImgBanner",
  mixins: [banner, Formatter],
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        spaceBetween: 1,
      },
    }
  },
};
</script>

<style></style>
