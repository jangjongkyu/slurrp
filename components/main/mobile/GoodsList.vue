<template>
  <div class="item_list_wrap main_new" :class="listType">
    <ul class="item_list">
      <goods
        v-for="(goods, goodsIndex) in goodsList"
        :key="`goods-${goodsIndex}`"
        :goods="goods"
      />
    </ul>
  </div>
</template>

<script>
import GoodsList from "../desktop/GoodsList";
import Goods from "@/components/goods/default/Mobile";

export default {
  name: "goodsList",
  components: { Goods },
  extends: GoodsList,
  props: {
    goodsList: {
      type: Array,
      default: () => []
    },
    listType: {
      type: String,
      default: ""
    }
  }
};
</script>
