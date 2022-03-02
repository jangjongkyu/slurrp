const STORAGE_KEY = process.env.RECENT_VIEWED_STORAGE_KEY || 'RCV';
const ARRAY_LIMIT = process.env.RECENT_VIEWED_SIZE || 20;

/**
 * @class RecentViewed
 * @description 최근 본 상품 목록 (GOODS ID ONLY)
 */
class RecentViewed {

  constructor($axios, store) { 
    console.assert($axios !== undefined, '$axios module is required');
    this.$axios = $axios;
    this.store = store;
    try {
      let goodsOrg = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if(goodsOrg && Array.isArray(goodsOrg)) {
        this.goods = goodsOrg;
      } else {
        this.goods = [];
      }
    } catch (e) {
      this.goods = [];
    }
  }

  async put(goodsId) {
    try {
      //상품상세 조회수 증가
      this.$axios.$post("/api/goods/hit", { goodsId : goodsId});
    } catch (e) {}

    let index = this.goods.indexOf(goodsId);
    if (index >= 0) {
      this.goods.splice(index, 1);
    }
    this.goods.unshift(goodsId);
    this.goods = this.goods.slice(0, ARRAY_LIMIT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.goods));

    await this.get();
  }

  async get() {
    let goods;
    try {
      goods = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if(!goods || !Array.isArray(goods)) {
        goods = [];
      }
    } catch (e) {
      goods = [];
    }

    if (this.store.state.session.isMember) {
      goods = await this.$axios.$post("/api/member/recent-viewed", { goods, size: ARRAY_LIMIT });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(goods));
    this.goods = goods;
  }

  async getGoods() {
    if (!this.goods || !this.goods.length) {
      await this.get();
    }

    const goodsList = await this.$axios.$get('/api/member/recent-viewed/goods', {params: {goodsIds: this.goods}});
    return goodsList.filter(goods => {
      return !!goods && this.goods.includes(goods.goodsId);
    });
  }

  async delete(goodsIds) {
    await this.$axios.$delete('/api/member/recent-viewed', {
      params: {
        goodsIds
      }
    });
    this.goods = this.goods.filter(id => goodsIds.indexOf(id) === -1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.goods));
  }
}

export default ({ app, $axios, store }, inject) => {
  let recent = new RecentViewed($axios, store);
  app.$recent = recent;
  inject('recent', recent);
};
