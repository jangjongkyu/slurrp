<template>
  <nuxt-link :to="`/goods?id=${goods.goodsId}`">
    <figure class="figure">
      <div class="thumnail">
        <img
          :src="getImageUrl(goods.imgPath)"
          onerror="this.src='/images/no-img.jpg'"
          :alt="goods.goodsNm"
        />
      </div>
      <figcaption class="figcaption">
        <div class="promotion" v-if="goods.prmtNm">{{ goods.prmtNm }}</div>
        <div class="name">{{ goods.goodsNm }}</div>
        <div class="price">
          <del class="origin" v-if="dcAmt > 0">{{ formatAmount(saleAmt) }}</del>
          <span class="saled">{{ formatAmount(saleAmt - dcAmt) }}</span>
          <span class="percent" v-if="dcAmt > 0">{{ formatPercent(dcAmt / saleAmt) }}</span>
        </div>
      </figcaption>
    </figure>
  </nuxt-link>
</template>

<script>
import Desktop from "../default/Desktop";

export default {
  extends: Desktop
};
</script>
