<template>
  <div class="popup_layer w600 mh700">
    <div class="popup_header">
      <button type="button" class="bt_closepop" @click.prevent="$emit('close')">닫기</button>
      <button type="button" class="bt_pop_left_ct" slot="button-prev">이전</button>
      <button type="button" class="bt_pop_right_ct" slot="button-next">다음</button>
      <div class="bt_pop_sns">
        <a target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${currentHref}`" class="bt_pop_fb">페이스북</a>
        <a target="_blank" :href="`https://twitter.com/intent/tweet?text=${catalogue.seasonNm}&url=${currentHref}`" class="bt_pop_tt">트위터</a>
      </div>
    </div>
    <div class="popup_contents">
      <client-only>
        <swiper :options="photoSwiperOption">
          <swiper-slide v-for="(image, idx) in catalogue.images" :key="`catalogue-${idx}`">
            <div
              class="pop_photo_img_ct"
              :style="`background-image:url(${getImageUrl(image.imgPath)})`"
            ></div>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
  </div>
</template>

<script>
import formatter from 'assets/mixins/formatter';

export default {
  mixins: [formatter],
  props: {
    catalogue: Object,
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      photoSwiperOption: {
        spaceBetween: 0,
        centeredSlides: true,
        initialSlide: this.index,
        navigation: {
          nextEl: '.bt_pop_right_ct',
          prevEl: '.bt_pop_left_ct',
        },
      },
    };
  },
  computed: {
    currentHref() {
      return window.location.href;
      // return 'https://niceclaup.skyware.co.kr/footer/catalogue';
    },
  }
};
</script>
