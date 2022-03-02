<template>
  <div :class="{ popup_layer: $device.isDesktop }">
    <!-- Header -->
    <header class="header_wrap" v-if="$device.isMobile">
      <nav class="header_pop">
        <button type="button" class="bt_closeall" @click.stop="$emit('close')">
          닫기
        </button>
      </nav>
    </header>

    <div class="popup_header" v-else>
      <button type="button" class="bt_closepop" @click.stop="$emit('close')">
        닫기
      </button>
    </div>
    <!-- //Header -->

    <!-- Container -->
    <div class="contents" v-html-custom="html">
    </div>
    <!-- //Container -->
  </div>
</template>

<script>
export default {
  props: {
    html: String
  }
}
</script>

<style scoped lang="scss">
.popup_layer {
  width: inherit;
  .contents {
    padding: 0 20px 20px;
    max-height: 600px;
    overflow-y: auto;
  }
}
.contents {
  box-sizing: border-box;
  /deep/ img {
    max-width: 100%;
  }
}
</style>
