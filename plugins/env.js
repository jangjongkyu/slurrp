import Vue from "vue";
import Formatter from "@/assets/mixins/formatter";

Vue.mixin(Formatter);

Vue.directive("html-custom", {
  bind: function (el, binding, vnode) {
    el.innerHTML = binding.value;
  },
  update: function (el, binding, vnode) {
    el.innerHTML = binding.value;
  }
});

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

export default (ctx, inject) => {
  let env = {
    debug: ctx.env.debug,
    siteUrl: ctx.env.siteUrl,
    cdnUrl: ctx.env.cdnUrl,
    siteNo: ctx.env.siteNo,
    brandNo: ctx.env.brandNo,
    naverClientId: ctx.env.naverClientId,
    CART_STORAGE_KEY: ctx.env.CART_STORAGE_KEY,
    ORDER_STORAGE_KEY: ctx.env.ORDER_STORAGE_KEY,
    NO_MEMBER_COOKIE_ID: ctx.env.NO_MEMBER_COOKIE_ID,
    kcpGatewayUrl: ctx.env.KCP_GATEWAY_URL,
    kcpJsUrl: ctx.env.KCP_JS_URL,
    kakaoApiKey: ctx.env.kakaoApiKey,
    DIQUEST_REQUEST_URL: ctx.env.DIQUEST_REQUEST_URL,
    APPLE_CLIENT_ID: ctx.env.APPLE_CLIENT_ID,
    IS_LIVE: ctx.env.IS_LIVE,
    instaAccessToken: ctx.env.instaAccessToken,
    INSTA_ACCESS_ID: ctx.env.INSTA_ACCESS_ID,
    DORMANT_INFO_KEY: ctx.env.DORMANT_INFO_KEY
  };

  ctx.app.$env = env;
  inject("env", env);

  ctx.app.debug = ctx.env.debug;
};
