<template>
  <section>
    <div class="sel_common promotion">
      <select required v-model="catalogue">
        <option v-if="catalogues.length === 0" :value="undefined">카탈로그가 없습니다.</option>
        <option v-for="item in catalogues" :value="item">{{ item.seasonNm }}</option>
      </select>
    </div>
    <div class="catalogue_wrap" v-if="catalogues.length > 0">
      <div
        v-for="(image, i) in catalogue.images"
        :key="`catalogue-${i}`"
        class="img">
        <a href="" @click.prevent="openPhotoModal(i)">
          <img :src="getImageUrl(image.imgPath)" onerror="this.src='/images/no-img.jpg'"/>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import MobilePhotoModal from "@/components/pages/footer/catalogue/modal/MobilePhotoModal";
import Desktop from '@/components/pages/footer/catalogue/Desktop';

export default {
  extends: Desktop,
  methods: {
    openPhotoModal(index) {
      this.$modal.show(
        MobilePhotoModal,
        {
          catalogue: this.catalogue,
          index
        },
        {
          width: "300px",
          height: "auto",
        }
      );
    },
  }
};
</script>

