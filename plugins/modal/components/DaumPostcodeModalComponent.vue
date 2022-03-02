<template>
  <div class="modal-content">
    <header class="modal-header">
      <h3 class="modal-title">주소 검색</h3>
      <button type="button" class="close" @click.stop="$dismiss">
      </button>
    </header>
    <section class="modal-body" style="padding: 0;">
      <div ref="daumPost" class="daum-post"></div>
    </section>
  </div>
</template>

<script>

export default {
  mounted() {
    this.$loadScript("https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js")
      .then(() => {
        this.openDaumPostcode();
      });
  },
  methods: {
    openDaumPostcode() {
      new daum.Postcode({
        oncomplete: (data) => {
          this.$close(data);
        }
      }).embed(this.$refs.daumPost);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.daum-post {
  height: 100%;

  @media (max-width: $breakpoint - 1) {
    > /deep/ div {
      height: 100% !important;
    }
  }

  > /deep/ div {
    width: 100% !important;
    margin: auto !important;
  }
}
</style>
