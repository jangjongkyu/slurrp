import _ from "@/assets/libs/lodash";

function _putCartId(id, isGuest, STORAGE_KEY) {
  try {
    if (isGuest) {
      window.localStorage.setItem(STORAGE_KEY, id);
    } else {
      _removeStorage();
    }
  } catch (e) {}
}

function _removeStorage(STORAGE_KEY) {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

/**
 * 장바구니 모델
 * @class Cart
 */
export default class Cart {
  /**
   * Construct cart
   * @param axios {NuxtAxiosInstance} Axios
   * @param store {Store} Store
   * @param key {string} Storage key
   */
  constructor(axios, store, key) {
    this.axios = axios;
    this.store = store;

    this.goodsList = [];
    this.totalGoodsAmt = 0;
    this.totalPrmtDcAmt = 0;
    this.totalOfrstfDcAmt = 0;
    this.totalDlvrAmt = 0;
    this.totalAmt = 0;

    this.STORAGE_KEY = key;
  }

  setGoodsList(goodsList) {
    this.goodsList = goodsList || [];
  }

  async get() {
    let id = undefined;
    try {
      id = window.localStorage.getItem(this.STORAGE_KEY);
    } catch (e) {
      id = undefined;
    }
    try {
      let cart = await this.axios.$get("/api/cart", { params: { id } });
      this.afterFetch(cart);
    } catch (e) {
      // console.error(e);
      this.id = undefined;
      this.goodsList = [];
    }
  }

  /**
   * 상품 추가
   * @param item {Object} 추가할 단품
   */
  async add(item) {
    let data = _.merge(
      {
        cartId: this.id,
        goodsId: undefined,
        itemNo: undefined,
        buyQty: 0,
      },
      item || {}
    );

    if (
      data.goodsId !== undefined &&
      data.itemNo !== undefined &&
      data.buyQty > 0
    ) {
      await this.axios.$post("/api/cart", data);
    } else {
      // console.error("Invalid item", item);
    }
  }

  /**
   * 단품 제거
   * @param item {Object} 삭제할 단품
   */
  async remove(item) {
    item = item || {};

    if (item.goodsId !== undefined && item.itemNo !== undefined) {
      await this.axios.$delete("/api/cart", {
        params: {
          cartId: this.id,
          goodsId: item.goodsId,
          itemNo: item.itemNo,
        },
      });
    }
  }

  /**
   * 데이터 Fetching 후
   * @param cart {object} 장바구니 Response Body
   */
  afterFetch(cart) {
    this.id = (cart || {}).id;
    this.goodsList = (cart || {}).goodsList;

    this.store.commit("session/updateCartGoodsLength", this.goodsList.length);
    _putCartId(
      (cart || {}).id,
      this.store.state.session.isGuest,
      this.STORAGE_KEY
    );
  }

  /**
   * 상품 변경
   * @param from {Object} 변경될 단품
   * @param to {Object} 변경할 단품
   */
  async replace(from, to) {
    await Promise.all([
      this.remove(from),
      this.add(to)
    ]);
  }

  /**
   * 장바구니 결제 정보 갱신
   * @param select {array} 선택된 장바구니 결제 정보
   */
  async updateCartInfo(select) {
    select = select || [];
    this.totalGoodsAmt = 0;
    this.totalPrmtDcAmt = 0;
    this.totalOfrstfDcAmt = 0;
    this.totalDlvrAmt = 0;
    this.totalAmt = 0;
    if (select.length > 0) {
      let data = this.goodsList.filter(
        (x) => select.indexOf(`${x.goodsId}_${x.itemNo}`) >= 0
      );
      if (data.length > 0) {
        let cart = await this.axios.$put("/api/cart/cart-total-info", data);
        this.totalGoodsAmt = (cart || {}).totalGoodsAmt || 0;
        this.totalPrmtDcAmt = (cart || {}).totalPrmtDcAmt || 0;
        this.totalOfrstfDcAmt = (cart || {}).totalOfrstfDcAmt || 0;
        this.totalDlvrAmt = (cart || {}).totalDlvrAmt || 0;
        this.totalAmt = (cart || {}).totalAmt || 0;
      }
    }
  }

  /**
   * 장바구니 검증 (재고 등)
   */
  validate() {}

  /**
   * 장바구니 초기화
   */
  clear() {
    _removeStorage(this.STORAGE_KEY);
  }
}
