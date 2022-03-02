<template>
  <div class="loading" v-if="loading">
    <div class="contents">
      <div class="loading-img"><img src="/images/loading.gif" alt="로딩중"></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    lazyStart: false,
  }),
  methods: {
    start() {
      this.lazyStart = true;
      setTimeout(() => {
        if (this.lazyStart) {
          this.loading = true;
          document.body.classList.add("in-loading");
        } else {
          this.finish();
        }
      }, 400);
    },

    finish() {
      this.lazyStart = false;
      this.loading = false;
      document.body.classList.remove("in-loading");
    },
  },
};
</script>

<style lang="scss">
.loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 10000;
}

.loading .contents {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
