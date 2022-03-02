<template>
  <section class="section sns-login-screen">
    <div class="loader">
      <img src="~assets/images/spinner.gif"/>
    </div>
    <h1 class="text">연결 중 입니다...</h1>
  </section>
</template>

<script>
import SnsLink from "@/assets/mixins/sns-link";

let naverLogin;

export default {
  mixins: [ SnsLink ],

  middleware: [ "member-only" ],

  data: () => ({
    hasError: false
  }),

  async fetch({ $axios, store }) {
    let site = await $axios.$get("/api/site");
    store.commit("session/updateSiteInfo", site);
  },

  async asyncData({req}) {
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
        return {hasError};
      } catch (e) {
        return {};
      }
    }
  },

  beforeMount() {
    naverLogin = new this.$naverLogin.LoginWithNaverId({
      clientId: this.$env.naverClientId,
      redirectUrl: `${this.$env.siteUrl}/link/naver`,
      callbackHandle: true,
    });
    naverLogin.init();
  },

  mounted() {
    if (this.hasError) {
      try {
        if (window.opener.doNaverLoginResult) {
          window.close();
        }
      } catch (e) {
        this.$router.push("/my-page/user/edit");
      }
    }

    naverLogin.getLoginStatus((status) => {
      if (status) {
        try {
          window.opener.doNaverLoginResult(naverLogin.accessToken.accessToken);
          window.close();
        } catch (e) {
          this.linkSns("NAVER", naverLogin.accessToken.accessToken);
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
