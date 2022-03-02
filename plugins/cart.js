import Cart from "assets/models/Cart";

/**
 * 장바구니 플러그인 초기화
 *
 * @param ctx
 * @param inject
 */
export default ({ $axios, store, app, env }, inject) => {
  // 카트 플러그인 초기화
  let cart = new Cart($axios, store, env.CART_STORAGE_KEY);
  app.$cart = cart;
  inject("cart", cart);
};
