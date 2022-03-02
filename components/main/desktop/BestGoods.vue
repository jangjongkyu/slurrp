<template>
  <div class="main_st">
    <h4 class="main_st_title">
      <div class="name" v-if="$store.state.session.isMember === true">
        {{ $store.state.session.profile.name }}님,
      </div>
      요즘 인기상품 보셨어요?   <span class="fa_l">최근 일주일 판매 베스트 상품!</span>
    
      <!--a href="/main/best" class="bt_arr3">
      더보기
      </a-->
      
      <nuxt-link
        :to="{path:'/main/best'}"
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
      this.goodsList = await this.$axios.$get(`/api/main/${this.category.categoryNo}/goods`, {params : {count : 30} });
      // console.log('this.goodsList : ', this.goodsList);
    }
  },

};
</script>
