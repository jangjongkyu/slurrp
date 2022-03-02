<template>
  <section class="section">
    <div class="loader">
      <img src="~assets/images/spinner.gif" />
    </div>
    <h1 class="text">연결 중 입니다...</h1>
  </section>
</template>

<script>
import SimpleLogin from "assets/mixins/simple-login";

export default {
  mixins: [ SimpleLogin ],

  middleware: ["anonymous-only"],

  async asyncData({ req }) {
    if (process.server) {
      return { form: req.body };
    }
  },

  data: () => ({
    form: {
      code: undefined,
      id_token: undefined
    }
  }),

  mounted() {
    let code = _getValue(this.form.code);
    let id_token = _getValue(this.form.id_token);
    if (code != "" && id_token != "") {
      this.doOAuthLoginChain("APPLE", [code, id_token, `${this.$env.siteUrl}/login/apple`].join("@@@@"));
    } else {
      this.$router.push("/login");
    }
  }
};

function _getValue(value) {
  if (value === undefined || value === null) return "";
  else return String(value).trim();
}
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
