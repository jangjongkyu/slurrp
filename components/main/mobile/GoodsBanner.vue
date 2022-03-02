<template>
  <div class="item_slide_wrap main">
    <h4 class="title_main inner" v-if="$store.state.session.isMember === true">
      <em><em>
        {{ $store.state.session.profile.name }}</em>님,</em>
        <br />요즘 인기상품 보셨어요? 
        <!--a href="/main/best" class="bt_arr2 w0 mgt5">더보기</a-->
        <nuxt-link
        :to="{path:'/main/best'}"
        class="bt_arr2 w0 mgt5"
        >
        더보기
        </nuxt-link>
        <br />
      <span>최근 일주일 판매 베스트 상품!</span>
    </h4>
    <!-- 비로그인 -->
    <h4 class="title_main inner hot" v-else>
      요즘 인기상품 보셨어요? 
      <!--a href="/main/best" class="bt_arr2 w0 mgt5">더보기</a-->
      <nuxt-link
        :to="{path:'/main/best'}"
        class="bt_arr2 w0 mgt5"
      >
      더보기
      </nuxt-link>
      <br />
      <span>최근 일주일 판매 베스트 상품!</span>
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
      this.goodsList = await this.$axios.$get(`/api/main/${this.category.categoryNo}/goods`, {params : {count : 30} });
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 2.5,
        slidesPerGroup: 1,
        spaceBetween: 1,
      },
      goodsList: []
    };
  }
};
</script>
