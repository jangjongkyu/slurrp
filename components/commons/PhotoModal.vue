<template>
  <div :class="classes">
    <div class="popup_header">
      <button type="button" class="bt_closepop" @click.prevent="$emit('close')">
        닫기
      </button>
    </div>
    <div class="popup_contents">
      <div v-if="$device.isDesktop"
        class="pop_photo_img_ct"
        :style="`background-image:url(${getImageUrl(image)})`"
      ></div>
      <div class="item_swiper_box" v-else>
        <div class="img">
          <a><img :src="getImageUrl(image)" onerror="this.src='/images/no-img.jpg'"/></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatter from 'assets/mixins/formatter';

export default {
  mixins: [formatter],
  props: {
    image: {
      type: String
    },
  },
  computed: {
    classes() {
      return this.$device.isMobile ? ['popup_layer', 'catalogue'] : ['popup_layer', 'w600', 'mh700'];
    },
  }
};
</script>
