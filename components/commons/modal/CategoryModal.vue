<template>
  <div id="wrap">
    <!-- Header -->
    <header class="header_wrap">
      <nav class="header_mar_set">
        <h1 class="category">
          <a @click.prevent="doRoute('/')" class="bt_logo">나이스클랍</a>
        </h1>
        <button type="button" class="bt_closeall" @click.stop="$emit('close')">
          닫기
        </button>
      </nav>
    </header>
    <!--// Header -->
    <!-- Container -->
    <main class="contents">
      <section>
        <div class="category_header_wrap" v-if="$store.state.session.isMember === true">
          <div class="category_user_info">
            <p class="category_user_name"><span>{{ $store.state.session.profile.name }}</span> 님 </p>
          </div>
          <div class="category_benefit">
            <div>
              <a @click.prevent="doRoute('/my-page/coupon')">
                <span class="title">쿠폰</span>
                <span class="num">{{ formatAmount($store.state.session.profile.memberOwnCouponCount) }}</span>
              </a>
            </div>
            <div>
              <a @click.prevent="doRoute('/my-page/mileage')">
                <span class="title">포인트</span>
                <span class="num">{{ formatAmount($store.state.session.profile.points) }}</span>
              </a>
            </div>
          </div>
        </div>

        <div class="category_header_wrap" v-else>
          <div class="category_user_info">
            <p class="category_user_name">
              <a @click.prevent="doRoute('/login')">로그인하기</a>
            </p>
          </div>
          <div class="category_benefit">
            <div>
              <a @click.prevent="doRoute('/my-page/coupon')">
                <span class="title">쿠폰</span>
                <span class="num">-</span>
              </a>
            </div>
            <div>
              <a @click.prevent="doRoute('/my-page/mileage')">
                <span class="title">포인트</span>
                <span class="num">-</span>
              </a>
            </div>
          </div>
        </div>

          <div class="category_outlet">
            <a
              class="tit_normal"
              @click.stop="doRoute({ path: '/category', query: { id: 10 } })"
            >전체</a>
          </div>
        <div class="board_list_wrap category">
          <BulmaAccordion
            :dropdown="true"
            :icon="'custom'"
            :slide="{duration: '.3s',timerFunc: 'ease'}"
          >
            <ul class="board_list bdtn">
              <li v-for="(category, index) in categories" :key="index">
                <BulmaAccordionItem>
                  <div class="board_header" slot="title">
                    <div class="tit">
                      {{ category.dispClsfNm }}
                      <!-- <a
                        @click.stop="doRoute({ path: '/category', query: { id: category.dispClsfNo } })"
                      >
                        {{ category.dispClsfNm }}
                      </a> -->
                    </div>
                  </div>
                  <div class="board_detail" slot="content">
                    <div class="category_2depth_wrap">
                      <ul class="category_2depth_inner">
                        <li @click.stop="doRoute({ path: '/category', query: { id: category.dispClsfNo } })">
                          <a>전체</a>
                        </li>
                        <li
                          v-for="(subCategory, subIndex) in category.subDispCateList"
                          :key="`category_${index}_sub_${subIndex}`"
                          @click.stop="doRoute({ path: '/category', query: { id: subCategory.dispClsfNo } })"
                        >
                          <a>{{ subCategory.dispClsfNm }}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </BulmaAccordionItem>
              </li>
            </ul>
          </BulmaAccordion>
        </div>
        <div class="category_outlet">
          <a
            class="tit_outlet"
            @click.stop="doRoute({ path: '/category', query: { id: 15 } })"
          >아울렛</a>
        </div>

        <div class="category_etc_wrap">
          <ul class="category_etc_inner">
            <li class="promotion">
              <a @click.prevent="doRoute('/promotion')">기획전</a>
            </li>
            <li class="event">
              <a @click.prevent="doRoute('/event')">EVENT</a>
            </li>
            <li class="adFilm">
              <a @click.prevent="doRoute('/footer/adfilm')">AD FLIM</a>
            </li>
            <li class="catalogue">
              <a @click.prevent="doRoute('/footer/catalogue')">CATALOGUE</a>
            </li>
            <li class="cs">
              <a @click.prevent="doRoute('/customer')">고객센터</a>
            </li>
          </ul>
        </div>
        <div class="bt_last mgt20" v-if="$store.state.session.isMember === true">
          <button
            type="button"
            class="bt_white_s"
            @click.stop="onLogoutButtonClicked()"
          >
            로그아웃
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [],
  }),

  methods: {
    doRoute(path) {
      this.$router.push(path);
      // 400ms 이후 꺼짐
      setTimeout(() => this.$emit("close"), 400);
    },
    async onLogoutButtonClicked() {
      await this.$axios.$post("/api/logout");
      this.$store.commit("session/clear");
      await this.$router.push("/", () => window.location.reload());
    },
  },

  watch: {
    "$store.state.category.categories": {
      immediate: true,
      handler(value) {
        this.categories = value.filter(x => x.dispLvl === 1 && x.dispClsfCd === "10" && x.dispClsfNm != "카테고리");
      }
    }
  }
};
</script>
