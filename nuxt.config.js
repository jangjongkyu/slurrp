import bodyParser from "body-parser";
// import moment from "moment";
// import fs from "fs";
// import path from "path";

const features = [
  "Array.prototype.find",
  "Intl",
  "CustomEvent",
  "EventSource",
].join("%2C");

// let access = fs.createWriteStream(path.join(__dirname, "/logs/access.log"), { flags: "a" });
// let error  = fs.createWriteStream(path.join(__dirname, "/logs/error.log"), { flags: "a" });

// process.stdout.pipe(access);
// process.stderr.pipe(error);

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  //ssr: false,
  target: "server",

  presets: [["@vue/app", {useBuiltIns: "entry"}]],

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Slurrp",
    meta: [
      { charset: "utf-8" },
      { hid: "viewport", name: "viewport", content: "user-scalable=no,viewport-fit=auto,initial-scale=1,minimum-scale=1,maximum-scale=1,width=device-width,target-densitydpi=device-dpi" },
      { hid: "description", name: "description", content: "[Slurrp 그림판]" },
      { hid: "ogdescription", property: "og:description", content: "[Slurrp 그림판]" },
      { hid: "url", property: "og:url", content: process.env.SITE_URL },
      { hid: "title", property: "og:title", content: process.env.OG_SITE_NAME },
      { hid: "type", property: "og:type", content: "website" },
      { hid: "image", property: "og:image", content: process.env.OG_SITE_IMAGE_URL },
    ],
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
    script: [
      { src: "/js/ie11.js" },
      { src: `https://polyfill.io/v3/polyfill.min.js?features=${features}` },
      { type: "application/ld+json", innerHTML: `
{
  "@context": "http://schema.org",
  "@type": "Organization",
  "name": "나이스클랍",
  "url": "https://www.niceclaup.co.kr",
  "sameAs": [
    "https://www.facebook.com/niceclaupkorea",
    "https://www.instagram.com/niceclaupkorea",
  ]
},
      ` }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["spinkit/spinkit.min.css", "@/assets/css/styles.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: "@/plugins/modal", mode: "client"},
    // Vue touch
    "@/plugins/vue-touch.client.js",
    // Vue Awesome Swiper 2
    "@/plugins/vue-awesome-swiper.client.js",
    // Env settings
    "@/plugins/env",
    // 코드 캐싱 Plugin
    "@/plugins/cache.client.js",
    // 최근 본 상품 Plugin
    "@/plugins/recent-viewed.client.js",
    // 카카오 API Plugin
    "@/plugins/kakao.client.js",
    // 네이버 API Plugin
    "@/plugins/naver.client.js",
    // Vue Sweetalert
    "@/plugins/vue-sweetalert2.client.js",
    // 장바구니 플러그인
    "@/plugins/cart.js",
    // 최근 검색어 서비스
    "@/plugins/recent.keyword.client.js",
    // Axios Instance Configuration
    "@/plugins/axios.js",
    // Vue Load Script
    {src: "@/plugins/vue-plugin-load-script", mode: "client"},
    // Vue JS Modal
    "@/plugins/vue-js-modal.js",
    // Vue accordion
    "@/plugins/vue-collapse.js",
    "@/plugins/vue-bulma-accordion.client.js",
    // Vue calendar
    "@/plugins/vue-datepicker.client.js",
    // vue rating
    "@/plugins/vue-rate-it.client.js",
    // vue sticky
    "@/plugins/vue-affix.client.js",
    // vue read more
    "@/plugins/vue-clamp.client.js",
    // vue tooltip
    "@/plugins/vue-tooltip.client.js",

    "@/plugins/member",
    "@/plugins/order",
    "@/plugins/filter",
    "@/plugins/coupon",
    "@/plugins/mileage",
    "@/plugins/review",
    "@/plugins/inquiry",
    "@/plugins/wish-list",
    "@/plugins/page-util"
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://github.com/nuxt-community/style-resources-module#readme
    "@nuxtjs/style-resources",
    // https://github.com/nuxt-community/device-module
    "@nuxtjs/device",
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    "cookie-universal-nuxt",
    // https://github.com/nuxt-community/gtm-module
    "@nuxtjs/gtm"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: process.env.NODE_ENV !== "production",
    baseURL: process.env.SITE_URL || "http://localhost:3000",
    browserBaseURL: process.env.SITE_URL || "http://localhost:3000",
    headers: {
      common: {
        "X-Site-ID": process.env.SITE_NO || 0,
      },
    },
  },

  proxy: {
    "/api/": process.env.API_URL || "http://localhost:8080",
    "/kcp/": process.env.API_URL || "http://localhost:8080",
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ["babel-polyfill"],
    transpile: ["vue-clamp", "resize-detector", "swiper", "dom7"],
  },

  // Environment Configuration (https://ko.nuxtjs.org/docs/2.x/configuration-glossary/configuration-env)
  env: {
    debug: process.env.DEBUG || false,
    siteUrl: process.env.SITE_URL || "http://localhost:3000",
    cdnUrl: process.env.CDN_URL || "http://localhost:3000",
    siteNo: process.env.SITE_NO || 0,
    brandNo: process.env.BRAND_NO,
    kakaoApiKey: process.env.KAKAO_API_KEY || "",
    naverClientId: process.env.NAVER_CLIENT_ID || "",
    CART_STORAGE_KEY: process.env.CART_STORAGE_KEY || "SEC_CART_ID",
    ORDER_STORAGE_KEY: process.env.ORDER_STORAGE_KEY || "SEC_ORDER_ID",
    NO_MEMBER_COOKIE_ID: process.env.NO_MEMBER_COOKIE_ID || "NO_MEMM_ORD_ID",
    instaAccessToken: process.env.INSTA_ACCESS_TOKEN || "",
    KCP_GATEWAY_URL: process.env.KCP_GATEWAY_URL || "testpaygw.kcp.co.kr",
    KCP_JS_URL: process.env.KCP_JS_URL || "https://testpay.kcp.co.kr/plugin/payplus_web.jsp",
    DIQUEST_REQUEST_URL: process.env.DIQUEST_REQUEST_URL,
    RECENT_KEYWORD_STORAGE_NAME: process.env.RECENT_KEYWORD_STORAGE_NAME,
    APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
    IS_LIVE: process.env.IS_LIVE
  },

  // Loading Configuration (https://ko.nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading/)
  loading: "@/components/Loading.vue",

  // 이건 사용하면 안됨
  //runtimeCompiler: true,

  serverMiddleware: {
    "/order": bodyParser.urlencoded({extended: true}),
    "/order/vbankDeposit": bodyParser.urlencoded({extended: true}),
    "/gift": bodyParser.urlencoded({extended: true}),
    "/gift/vbankDeposit": bodyParser.urlencoded({extended: true}),
    "/login/apple": bodyParser.urlencoded({ extended: true }),
    "/link/apple": bodyParser.urlencoded({ extended: true }),
    "/diquest": "@/serverMiddleware/diquest/index.js"
  },

  // Google Tag Manager Settings
  gtm: {
    enabled: undefined,
    debug: false,

    id: process.env.GTM_ID,
    layer: "dataLayer",
    variables: {},

    pageTracking: true,
    pageViewEventName: "page_view",

    autoInit: true,
    respectDoNotTrack: true,

    scriptId: "gtm-script",
    scriptDefer: false,
    scriptURL: 'https://www.googletagmanager.com/gtm.js',
    crossOrigin: false,

    noscript: true,
    noscriptId: "gtm-noscript",
    noscriptURL: 'https://www.googletagmanager.com/ns.html'
  }
};
