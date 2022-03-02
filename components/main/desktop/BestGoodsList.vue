<template>
  <div class="item_list_wrap">
    <client-only v-if="this.goodsList.length > 5">
      <swiper :options="swiperOptions" class="item_list n5">
        <swiper-slide
          v-for="(goods, goodsIndex) in goodsList"
          :key="`goods-${goodsIndex}`"
        >
            <goods
              :goods="goods"
            />
        </swiper-slide>
      </swiper>
    </client-only>
    <ul class="item_list n5" v-else>
      <goods
        v-for="(goods, goodsIndex) in goodsList"
        :key="`goods-${goodsIndex}`"
        :goods="goods"
      />
    </ul>
  </div>
</template>

<script>
import formatter from 'assets/mixins/formatter';
import Goods from "@/components/goods/default/Desktop";

export default {
  name: "goodsList",
  components: { Goods },
  mixins: [formatter],
  async fetch() {
    await this.getWishList();
  },
  props: {
    goodsList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      wishList: [],
      swiperOptions: {
        slidesPerView: 4.9,
        slidesPerGroup: 1,
        spaceBetween: 1,
      },
    }
  },
  methods: {
    async addWishList(goods) {
      await this.$axios.$post('/api/category/saveMbrIntrGoods', goods);
      await this.getWishList();
    },
    async deleteWishList(goods) {
      await this.$axios.$post('/api/category/delMbrIntrGoods', goods);
      await this.getWishList();
    },
    async getWishList() {
      this.wishList = await this.$axios.$get('/api/main/wish-list/ids');
    },
  },
};

</script>
