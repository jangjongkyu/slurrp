<template>
  <div class="popup_layer" :class="{ desktop: $device.isDesktop }">
    <div class="popup_header">
      <h5 class="title_pop">{{ title }}</h5>
      <button type="button" class="bt_closepop" @click.stop="$emit('close')">닫기</button>
    </div>
    <div class="popup_contents" style="max-height: 460px">
      <div class="terms_con" v-html-custom="contents"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    contents: {
      type: String,
      default: "",
    },
  }
};
</script>

<style lang="scss" scoped>
.popup_layer {
  &.desktop {
    width: inherit;
  }
  .popup_contents {
    padding-bottom: 20px;
  }
}
</style>
