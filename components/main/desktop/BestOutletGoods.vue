<template>
  <div class="main_st">
    <h4 class="main_st_title">
        
        아울렛 베스트   <span class="fa_l">최근 일주일 가장 많은 사랑을 받은 아울렛 베스트 상품!</span>

        <!--a href="/category?id=15" class="bt_arr3">
        더보기
        </a-->

        <nuxt-link
        :to="{path:'/category', query: {id: 15}}"
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
