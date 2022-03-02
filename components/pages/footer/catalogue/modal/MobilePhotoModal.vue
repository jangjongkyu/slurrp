<template>
  <div class="popup_layer catalogue">
    <div class="popup_header">
      <button type="button" class="bt_closepop" @click.prevent="$emit('close')">닫기</button>
      <div class="sns_wrap catalogue">
        <a target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${currentHref}`" class="sns_box facebook invert">Facebook</a>
        <a target="_blank" :href="`https://twitter.com/intent/tweet?text=${catalogue.seasonNm}&url=${currentHref}`" class="sns_box twitter invert">Instagram</a>
      </div>
    </div>
    <div class="popup_contents">
      <client-only>
        <swiper :options="photoSwiperOption">
          <swiper-slide v-for="(image, idx) in catalogue.images" :key="`catalogue-${idx}`">
            <div class="item_swiper_box">
              <div class="img">
                <a href=""><img :src="getImageUrl(image.imgPath)" onerror="this.src='/images/no-img.jpg'"/></a>
              </div>
            </div>
          </swiper-slide>
          <div
            class="swiper-pagination photo-swiper-pagination"
            slot="pagination"
          ></div>
        </swiper>
      </client-only>
    </div>
  </div>
</template>

<script>
import DesktopPhotoModal from '@/components/pages/footer/catalogue/modal/DesktopPhotoModal';

export default {
  extends: DesktopPhotoModal,
  data() {
    return {
      photoSwiperOption: {
        spaceBetween: 0,
        centeredSlides: true,
        initialSlide: this.index,
        pagination: {
          el: ".photo-swiper-pagination",
          clickable: true,
        },
      }
    }
  },
};
</script>
