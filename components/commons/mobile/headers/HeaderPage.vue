<template>
  <header class="header_wrap">
    <nav class="header_mar_set"> <!-- 이전 화면으로 -->
      <div class="menu_left">
        <a class="bt_back" @click.prevent="backButtonClicked()">
          이전 화면으로
        </a>
        <h2><span>{{ $store.state.layout.routeName }}</span></h2>
      </div>
      <div class="menu_right">
        <nuxt-link to="/" class="bt_home">메인으로</nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script>
import SearchModal from "@/components/commons/modal/SearchModal";

export default {
  data: () => ({
    searchModal: undefined,
  }),

  methods: {
    // backButtonClicked() {
    //   if (this.$store.state.layout.referrer) {
    //     return this.$router.push(this.$store.state.layout.referrer);
    //   } else {
    //     return this.$router.go(-1);
    //   }
    // },
    openSearchModal() {
      this.$modal.show(
        SearchModal,
        {
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

  }

}
</script>
