<template>
  <div class="main_trend_wrap">
    <!--h4 class="title_main">Trending Now</h4-->
    <div v-for="(banner, bannerIndex) in banners" :key="`banner-${bannerIndex}`">
      <figure>
        <div class="thumnail" @click="onClickLink(banner.bnrLinkUrl);">
          <img :src="getImageUrl(banner.bnrMobileImgPath)" onerror="this.src='/images/no-img.jpg'" alt="" />
        </div>
        <figcaption class="figcaption">
          <div class="title" @click="onClickLink(banner.bnrLinkUrl);" style="font-size:20px; width:100%; padding-right: 20px;">{{ banner.bnrText }}</div>
          <div class="copy">
            <pre v-html-custom="banner.bnrHtml"></pre>
          </div>
          <!--a :href="getUrl(banner.bnrLinkUrl)" class="bt_rblack w100 mgt15">보러가기</a-->
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
import banner from '@/components/main/banner';
import Formatter from "@/assets/mixins/formatter";

export default {
  name: "TrendList",
  mixins: [banner, Formatter],
  methods: {
    onClickLink(url){
      window.location = url;
    }
  },
};
</script>

<style></style>
