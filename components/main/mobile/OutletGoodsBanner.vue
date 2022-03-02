<template>
  <div class="item_slide_wrap main">
    <!-- 비로그인 -->
    <h4 class="title_main inner hot">
      아울렛 베스트 
      <!--a href="/category?id=15" class="bt_arr2 w0 mgt5">더보기</a-->
      <nuxt-link
        :to="{path:'/category', query: {id: 15}}"
        class="bt_arr2 w0 mgt5"
        >
        더보기
      </nuxt-link>
      <br />
      <span>최근 일주일 가장 많은 사랑을 받은 아울렛 베스트 상품!</span>
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
      //this.goodsList = await this.$axios.$get(`/api/main/${this.category.categoryNo}/goods`);
      let category = this.$store.state.category.categories.filter(x => x.dispClsfNo == 15)[0];
      let categories = _getSubDispClsfNo(category);

      /*
      console.log("category : ");
      console.log(category);
      console.log("categories : ");
      console.log(categories);
      */

      let params = {
        currentPage: 1,
        docPage: 30,
        st_id: this.$env.siteNo,
        collection: "GOODS",
        type: this.$device.isMobile ? "MO" : "PC",
        displaysort: 'DAILY_SALE_QTY_DESC',
        //displaysort: 'MONTHLY_SALE_QTY_DESC',
        //displaysort: 'MONTHLY_SALE_QTY_ASC',
        category: categories.join("$|"),
        color: ([]).join("$|"),
        size: ([]).join("$|"),
        material: ([]).join("$|")
      };

      let {goodsPage} =  await this.$axios.$post(`${this.$env.siteUrl}/diquest/search`, params);
      this.goodsList = goodsPage ? goodsPage.contents : [];
      
      /*
      console.log("goodsList : ");
      console.log(this.goodsList);
      */
      //this.goodsList = await this.$axios.$get(`/api/main/${this.category.categoryNo}/goods`);
      // console.log('this.goodsList : ', this.goodsList);
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

function _getSubDispClsfNo(c, array) {
  array = array || [];
  if (!c.subDispCateList) {
    let p = c, hierarchy = [];
    while (p) {
      hierarchy.unshift(p);
      p = p.parent;
    }
    array.push(hierarchy.map(x => x.dispClsfNo).join(","));
    return array;
  } else {
    c.subDispCateList.forEach(node => array.push.apply(array, _getSubDispClsfNo(node)));
    return array;
  }
}
</script>
