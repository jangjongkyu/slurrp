<template>
  <!-- Header -->
  <header class="header_wrap multi">
    <nav class="header_mar_set">
      <div class="menu_left">
        <a
          href="#"
          class="bt_menu"
          @click.prevent="openCategoryModal()"
        >
          메뉴
        </a>
        <h1>
          <nuxt-link to="/" class="bt_logo">
            나이스클랍
          </nuxt-link>
        </h1>
      </div>
      <div class="menu_right">
        <ul>
          <li class="search">
            <a
              href=""
              class="bt_search"
              @click.prevent="openSearchModal()"
            >
              검색
            </a>
          </li>
          <li class="cart">
            <nuxt-link
              :to="{ path:'/cart' }"
              class="bt_cart"
            >
              장바구니
              <span class="cart_badge" v-if="$store.state.session.profile.cartGoodsCount > 0"> {{ $store.state.session.profile.cartGoodsCount }}</span>
            </nuxt-link>
          </li>
          <li class="mypage">
            <nuxt-link
              :to="{ path:'/my-page' }"
              class="bt_user"
            >
              MY CLAUP
               <span class="mypage_badge" v-if="$store.state.session.profile.giftReceiveCount > 0"> {{ $store.state.session.profile.giftReceiveCount }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <!--// Header -->
</template>

<script>
import HeaderMain from "./HeaderMain";

export default {
  extends: HeaderMain,

  // methods: {
  //   backButtonClicked() {
  //     if (this.$store.state.layout.referrer) {
  //       return this.$router.push(this.$store.state.layout.referrer);
  //     } else {
  //       return this.$router.go(-1);
  //     }
  //   }
  // }
}
</script>
