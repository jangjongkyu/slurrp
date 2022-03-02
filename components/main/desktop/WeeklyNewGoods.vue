<template>
  <div class="main_st">
    <h4 class="main_st_title">
        
        위클리 신상품   <span class="fa_l">최근 일주일 새롭게 입고된 신상품을 만나보세요</span>
        
        <!--a href="/main/new" class="bt_arr3">
        더보기
        </a-->
      
        <nuxt-link
        :to="{path:'/main/new'}"
        class="bt_arr3"
        >
        더보기
        </nuxt-link>
        
    </h4>
    <goods-list :goods-list="goodsList"/>
  </div>
</template>

<script>
import GoodsList from "@/components/main/desktop/BestGoodsList";

export default {
  async fetch() {
    await this.fetchGoodsList();
  },
  components: {
    GoodsList,
  },
  props: {
    category: {
      type: Object,
      default: () => []
    },

  },
  data() {
    return{
      goodsList: [],
    }
  },

  methods: {
    async fetchGoodsList() {
      let page = 1;
      let goodsPage = await this.$axios.$get(`/api/goods/new/${page}`);
      this.goodsList = goodsPage ? goodsPage.list : [];
    }
  },

};
</script>
