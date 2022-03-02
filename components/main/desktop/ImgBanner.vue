<template>
  <div class="main_st">
    <h4 class="main_st_title">
      오늘의 기획전 <span class="fa_l">풍성한 혜택과 추천</span>
      <nuxt-link
        :to="{path:'/promotion'}"
        class="bt_arr3"
        >
        더보기
      </nuxt-link>
    </h4>
    <!-- Swiper -->
    <client-only>
      <swiper :options="swiperOptions" class="main_st_event">
        <swiper-slide v-for="(banner, bannerIndex) in banners" :key="`banner-${bannerIndex}`"
          class="main_st_event_swiper">
          <a :href="getUrl(banner.bnrLinkUrl)">
            <img :src="getImageUrl(banner.bnrImgPath)" onerror="this.src='/images/no-img.jpg'" alt="" />
          </a>
        </swiper-slide>
        <div slot="pagination" class="swiper-scrollbar img-swiper-scrollbar" />
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

    props: {
      category: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        swiperOptions: {
          slidesPerView: "auto",
          spaceBetween: 0,
          scrollbar: {
            el: ".img-swiper-scrollbar",
            hide: true,
          },
        },
      };
    },
  };

</script>

<style></style>
