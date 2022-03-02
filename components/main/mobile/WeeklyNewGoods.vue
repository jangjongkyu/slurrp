<template>
  <div class="item_slide_wrap main">
    <!-- 비로그인 -->
    <h4 class="title_main inner hot">
      위클리 신상품 
      <!--a href="/main/new" class="bt_arr2 w0 mgt5">더보기</a-->
      <nuxt-link
        :to="{path:'/main/new'}"
        class="bt_arr2 w0 mgt5"
        >
        더보기
      </nuxt-link>
      <br />
      <span>최근 일주일 새롭게 입고된 신상품을 만나보세요</span>
    </h4> 

    <!-- Swiper -->
    <client-only>
      <swiper :options="swiperOptions" class="item_slide small">
        <swiper-slide
          v-for="(goods, goodsIndex) in goodsList"
          :key="`goods-${goodsIndex}`"
        >
          <goods :goods="goods"/>
        </swiper-slide>
      </swiper>
    </client-only>
    <!-- //Swiper -->
  </div>
</template>

<script>
import numeral from "numeral";
import Goods from "@/components/goods/swiper/Mobile";

export default {
  name: "goodsBanner",
  components: { Goods },
  async fetch() {
    await this.fetchBanners();
  },
  props: {
    category: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    async fetchBanners() {
      let page = 1;
      let goodsPage = await this.$axios.$get(`/api/goods/new/${page}`);
      this.goodsList = goodsPage ? goodsPage.list : [];
      //this.count = goodsPage ? goodsPage.count : 0;
    },

  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 2.5,
        slidesPerGroup: 1,
        spaceBetween: 1,
      },
      goodsList: [],
      //count: 0,
    };
  }
};
</script>
