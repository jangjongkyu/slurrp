<template>
  <li :class="{'soldout': goods.salePsbCd === '30'}">
    <div class="wish">
      <button
        type="button"
        class="bt_wish"
        :class="{ 'on': $store.state.session.wishList.indexOf(goods.goodsId) >= 0 }"
        @click.stop="$_wish.toggle(goods.goodsId)"
      >
        찜하기
      </button>
    </div>
    <nuxt-link :to="{ path: '/goods', query: { id: goods.goodsId } }">
      <figure class="figure">
        <div class="thumnail">
          <img
            :src="getImageUrl(goods.imgPath)"
            onerror="this.src='/images/no-img.jpg'"
          />
        </div>
        <figcaption class="figcaption">
          <div class="soldoutinfo" v-if="goods.salePsbCd === '30'"><span>품절</span></div>
          <div class="promotion" v-if="goods.prmtNo != '0'">{{ goods.prmtNm }}</div>
          <div class="name">{{ goods.goodsNm }}</div>
          <div class="price">
            <del class="origin" v-if="dcAmt > 0">{{ formatAmount(saleAmt) }}</del>
            <span class="saled">{{ formatAmount(saleAmt - dcAmt) }}</span>
            <span class="percent" v-if="dcAmt > 0">{{ formatPercent(dcAmt / saleAmt) }}</span>
          </div>
          <div class="reviewstatus_wrap one">
            <div class="review_star">
              <span class="star"><i></i></span>
              <span class="score">{{ formatScore(goods.estmScore) }}</span>
              <span class="rcount">(<em>{{ formatCnt(goods.estmCnt) }}</em>)</span>
            </div>
            <div class="wish_score">
              <span class="wish_status"></span>
              <span>{{ formatCnt(goods.wishCnt) }}</span>
            </div>
          </div>

          <div class="colorchip">
            <span
              v-for="(item, itemIndex) in splitComma(goods.colorInfo)"
              :key="`item_${itemIndex}`"
              :style="{ 'background-color': getSplitData(item, '|', 1) }"
            >
            </span>
          </div>
        </figcaption>
      </figure>
    </nuxt-link>
  </li>
</template>

<script>
import Desktop from "./Desktop";

export default {
  extends: Desktop
};
</script>
