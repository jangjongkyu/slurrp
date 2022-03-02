<template>
  <div class="main_st">
    <h4 class="main_st_title">Trending Now</h4>
    <div class="main_st_trend_wrap">
      <div
        v-for="(banner, bannerIndex) in banners"
        :key="`banner-${bannerIndex}`"
        class="main_st_trend"
      >
        <div class="main_st_trend_img" @click="onClickLink(banner.bnrLinkUrl);" style="cursor:pointer;">
          <img :src="getImageUrl(banner.bnrImgPath)" onerror="this.src='/images/no-img.jpg'" alt="" />
        </div>
        <div class="main_st_trend_title" style="cursor:pointer">
            <div class="trend_title" @click="onClickLink(banner.bnrLinkUrl);">
              {{ banner.bnrText }}
            </div>
        </div>
        <div class="main_st_trend_text">
          {{ banner.bnrHtml }}
        </div>
        <!--a :href="getUrl(banner.bnrLinkUrl)" class="main_st_trend_bt">보러가기</a-->
      </div>
    </div>
  </div>
</template>

<script>
import banner from '@/components/main/banner';
import Formatter from "@/assets/mixins/formatter";

export default {
  name: "TrendList",
  mixins: [banner, Formatter],

  props: {
    category: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    // console.log('this.banners : ', this.banners);
  },
  methods: {
    onClickLink(url){
      window.location = url;
    }
  },
};
</script>

<style></style>
