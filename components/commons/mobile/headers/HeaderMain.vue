<template>
  <header class="header_wrap main"><!-- 메인 -->
    <nav class="header_mar_set">
      <div class="menu_left">
        <a href="#" class="bt_menu" @click.prevent="openCategoryModal()">메뉴</a>
        <h1>
          <nuxt-link
            to="/"
          >
            <img src="/web/images/logo_slurrp.png" alt="SLURRP"/>
          </nuxt-link>
        </h1>
      </div>
      <div class="menu_right">
        <ul>
          <!-- <li>{{ $store.state.layout.isAndroid ? "안드로이드" : $store.state.layout.isApple ? "사과" : "그냥웹" }}</li>-->
          <li class="search">
            <a href="" class="bt_search" @click.prevent="openSearchModal()">
              검색
            </a>
          </li>
          <li class="cart">
            <nuxt-link
              :to="{path:'/cart'}"
              class="bt_cart"
            >
              장바구니
              <span
                class="cart_badge"
                v-if="$store.state.session.profile.cartGoodsCount > 0"
              >
                {{ $store.state.session.profile.cartGoodsCount }}
              </span>
            </nuxt-link>
          </li>
          <li class="mypage">
            <nuxt-link
              :to="{path:'/my-page'}"
              class="bt_user"
            >
              MY CLAUP
               <span
                class="mypage_badge"
                v-if="$store.state.session.profile.giftReceiveCount > 0"
              >
                {{ $store.state.session.profile.giftReceiveCount }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import SearchModal from "@/components/commons/modal/SearchModal";
import CategoryModal from "@/components/commons/modal/CategoryModal";

export default {
  data: () => ({
    searchModal: undefined,
    categoryModal: undefined
  }),

  methods: {
    async openSearchModal() {
      await this.$_rk.load();
      let popular = await this.$axios.$get("/diquest/popular");
      this.$modal.show(
        SearchModal,
        {
          popular,
          update: (ref) => {
            this.searchModal = ref;
          }
        },
        {
          width: "100%",
          height: "100%",
        }
      );
    },
    openCategoryModal() {
      this.$modal.show(
        CategoryModal,
        {
          update: (ref) => {
            this.categoryModal = ref;
          }
        },
        {
          width: "100%",
          height: "100%",
        }
      );
    },
  }
}
</script>
