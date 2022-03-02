export default class WishListService {
  constructor($axios, store) {
    this.$axios = $axios;
    this.store = store;
    this.array = [];
  }

  status(wishGoods) {
    if (wishGoods.goodsStatCd === '60' || wishGoods.goodsStatCd === '50') {
      return 'FINISHED_SALES'
    }
    if (wishGoods.soldOutYn === 'Y') {
      return 'SOLD_OUT';
    }

    return 'NORMAL';
  }

  has(goodsId) {
    return this.array.indexOf(goodsId) >= 0;
  }

  async get() {
    try {
      let array = await this.$axios.$get("/api/member/wish-list");
      this.array = array;
      this.store.commit("session/updateWishList", this.array);
    } catch (e) {
      this.clear();
      // console.error(e);
    }
  }

  async toggle(goodsId) {
    try {
      let idx = this.array.indexOf(goodsId);
      if (idx >= 0) {
        await this.$axios.$delete(`/api/member/wish-goods/${goodsId}`);
      } else {
        if(this.store.state.session.isMember){
          await this.$axios.$post("/api/member/wish-goods", {goodsId});
        }
      }
      await this.get();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  clear() {
    this.array = [];
    this.store.commit("session/updateWishList", this.array);
  }

  deleteAll(ids) {
    return this.$axios.$delete('/api/member/wish-goods', {
      params: {
        goodsIds: ids
      }
    });
  }

  count() {
    return this.$axios.$get('/api/member/wish-goods/count');
  }
}

// const GOODS_STATUS = {
//   '10': '대기',
//   '20': '승인요청',
//   '30': '승인거절',
//   '40': '판매중',
//   '50': '판매중지',
//   '60': '판매종료',
// };
