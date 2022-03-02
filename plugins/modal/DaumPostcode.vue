<template>
  <div ref="body" class="daum-postcode" :class="{popup_layer: $device.isDesktop}">
    <header class="header_wrap" v-if="$device.isMobile">
      <nav class="header_pop">
        <h2><span>주소 검색</span></h2>
        <button type="button" class="bt_closeall" @click="$emit('close')">닫기</button>
      </nav>
    </header>
    
    <div class="popup_header" v-else>
      <button type="button" class="bt_closepop" @click="$emit('close')">닫기</button>
    </div>

    <section class="daum-postcode--body">
      <div
        ref="daumPost"
        class="daum-postcode--container"
        :style="bodyStyles"
      ></div>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$loadScript(
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
    ).then(() => {
      this.openDaumPostcode();
    });

    if (this.$device.isMobile) {
      this.height = this.$refs.body.clientHeight - 60;
      this.paddingBottom = 0;
    } else {
      this.height = 500;
    }
  },
  data: () => ({
    height: 0,
    paddingBottom: 0,
  }),
  computed: {
    bodyStyles() {
      return {
        height: this.height + "px",
        "padding-bottom": this.paddingBottom + "px",
      };
    },
  },
  methods: {
    openDaumPostcode() {
      new daum.Postcode({
        oncomplete: (data) => {
          this.$attrs.update(data);
          this.$emit("close");
        },
      }).embed(this.$refs.daumPost);
    },
  },
};
</script>

<style lang="scss" scoped>
.daum-postcode {
  height: 100%;

  button.close {
    background-color: transparent;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .daum-postcode--header {
    display: flex;
    align-items: center;
    padding: 5px 15px;
    height: 50px;

    .title {
      flex-grow: 1;
      font-size: 24px;
    }
  }

  .daum-postcode--close {
    position: relative;

    .close {
      position: fixed;
      margin-left: 510px;
      margin-top: 8px;
    }
  }

  .daum-postcode--container /deep/ div {
    position: relative;
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
