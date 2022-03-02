<template>
  <header class="header_wrap">
    <!--snb -->
    <div class="header_snb">
      <div class="header_home">
        <ul>
          <li>
            <nuxt-link :to="{ path: '/' }">HOME</nuxt-link>
          </li>
          <li class="text-banner">

            <!-- Swiper -->
            <client-only>
              <swiper :options="swiperOptions">
                <swiper-slide
                  v-for="(banner, index) in textBannerRollingList"
                  :key="`banner_${index}`"
                >
                  <a
                    :href="getUrl(banner.bnrLinkUrl)"
                    class="header_snb_event"
                  >
                    {{ banner.bnrHtml }}
                  </a>
                </swiper-slide>
              </swiper>
            </client-only>
            <!-- //Swiper -->

          </li>
        </ul>
      </div>

      <div class="header_member">
        <ul>
          <li v-if="$store.state.session.isGuest">
            <nuxt-link to="/login">로그인</nuxt-link>
          </li>
          <li v-else>
            <a href="" @click.prevent="onLogoutButtonClicked()">Logout</a>
          </li>
          <li v-if="$store.state.session.isGuest">
            <nuxt-link to="/join">회원가입</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/my-page">My Home
                          <div
                v-if="$store.state.session.profile.giftReceiveCount > 0"
                class="cart"
              >{{ $store.state.session.profile.giftReceiveCount }}</div>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <!--//snb -->

    <!-- GNB -->
    <div class="header_gnb">
      <div class="header_logo">
        <ul>
          <li>
            <button type="button" @click.stop="isShowCategory = !isShowCategory">
              <img src="/web/images/bt_common_menu.png" alt="카테고리"/>
            </button>
          </li>
          <li>
            <nuxt-link :to="{ path: '/' }">
              <img src="/web/images/logo_slurrp.png" alt="SLURRP"/>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="header_search">
        <input type="search" placeholder="Search" @focus="openSearchModal()"/>
        <button type="button">
          <img src="/web/images/icon_header_search.png" alt="검색"/>
        </button>
      </div>

      <div class="header_smenu">
        <ul>
          <li><nuxt-link to="/main/today">Canvas</nuxt-link></li>
          <li><nuxt-link to="/main/today">Best</nuxt-link></li>
          <li><nuxt-link to="/main/today">Event</nuxt-link></li>
          <li><nuxt-link to="/main/today">Community</nuxt-link></li>
        </ul>
      </div>
    </div>
    <!-- GNB -->
  </header>
</template>

<script>
import DesktopSearchModal from "@/components/commons/modal/DesktopSearchModal";

export default {
  components: {
    DesktopSearchModal,
  },

  data: () => ({
    categories: [],
    isShowCategory: false,
    textBannerList: [],
    textBannerRollingList: [],
    textBannerIndex: 1,
    textBannerRolling: undefined,
    giftReceiveCount : 0,
    swiperOptions: {
      direction: 'vertical',
      slidesPerView: 1,
      loop: true,
      speed : 1000,
      autoHeight: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    },
  }),

  async mounted() {
    try {
      //this.textBannerList = await this.$axios.$get("/api/main/text-banner");
      //this.textBannerRollingList = this.textBannerList.slice(0, 2);
      // console.log('textBannerRollingList : ', this.textBannerRollingList);
      // if (this.textBannerList.length > 1) {
      //   this.textBannerRolling = setInterval(this.textBannerRollingEventHandler, 10000);
      // }
    } catch (e) {
    }
  },

  watch: {
    "$store.state.category.categories": {
      immediate: true,
      handler(value) {
        console.log(value);
        this.categories = value.filter(x => x.dispLvl === 1 && x.dispClsfCd == "10" && x.dispClsfNm != "카테고리");
      },
    },
  },

  methods: {
    async onLogoutButtonClicked() {
      await this.$axios.$post("/api/logout");
      this.$store.commit("session/clear");
      await this.$router.push("/", () => window.location.reload());
    },
    closeCategory() {
      this.isShowCategory = false;
    },
    async openSearchModal() {
      await this.$_rk.load();
      let popular = await this.$axios.$get("/diquest/popular");
      this.$modal.show(
        DesktopSearchModal,
        {
          popular
        },
        {
          width: "100%",
          height: "100%",
        }
      );
    },

  }
};
</script>
