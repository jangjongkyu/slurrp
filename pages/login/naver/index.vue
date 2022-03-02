<template>
  <section class="section">
    <div class="loader">
      <img src="~assets/images/spinner.gif" />
    </div>
    <h1 class="text">연결 중 입니다...</h1>
  </section>
</template>

<script>
import SimpleLogin from "@/assets/mixins/simple-login";

export default {
  mixins: [ SimpleLogin ],

  middleware: ["anonymous-only"],

  data: () => ({
    hasError: false
  }),

  async fetch({ $axios, store }) {
    let site = await $axios.$get("/api/site");
    store.commit("session/updateSiteInfo", site);
  },

  async asyncData({ req }) {
    if (process.server) {
      try {
        let hasError = false;
        let query = req._parsedUrl.query;
        let queries = query.split("&");
        for (let i = 0; i < queries.length; i++) {
          let values = queries[i].split("=");
          if (values[0] === "error") {
            hasError = true;
          }
        }
        return { hasError };
      } catch (e) {
        return {};
      }
    }
  },

  mounted() {
    try {
      let t = new URL(document.referrer);
      if (t.pathname === "/join/simple-form") {
        return this.$router.push("/login");
      }
    } catch (e) {}

    if (this.hasError) {
      try {
        if (window.opener.doNaverLoginResult) {
          window.close();
        }
      } catch (e) {
        return this.$router.push("/login");
      }
    }
    this.naver.getLoginStatus((status) => {
      if (status) {
        try {
          window.opener.doNaverLoginResult(this.naver.accessToken.accessToken);
          window.close();
        } catch (e) {
          this.doOAuthLoginChain("NAVER", this.naver.accessToken.accessToken);
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.section {
  background-color: #ffffff;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999999;
  padding: 10rem 0;
  text-align: center;

  .text {
    color: #ababab;
    font-size: 1.2rem;
  }
}
</style>
