<template>
  <section>
    <!-- 타이틀 -->
    <div class="box">
      <div class="mar_set">
        <h4 class="title_1st">CATALOGUE</h4>
        <div class="foot_line_title">
          <div class="fr">
            <select required class="input_common bd_1 w300 mgl15" v-model="catalogue">
              <option v-if="catalogues.length === 0" :value="undefined">카탈로그가 없습니다.</option>
              <option v-for="item in catalogues" :value="item">{{ item.seasonNm }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!--// 타이틀 -->
    <div class="box" v-if="catalogues.length > 0">
      <div class="mar_set">
        <div class="catalogue_list">
          <button
            v-for="(image, i) in catalogue.images"
            :key="`catalogue-${i}`"
            type="button"
            :style="`background-image:url(${getImageUrl(image.imgPath)})`"
            @click.prevent="openPhotoModal(i)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DesktopPhotoModal from "@/components/pages/footer/catalogue/modal/DesktopPhotoModal";
import formatter from 'assets/mixins/formatter';

export default {
  props: {
    catalogues: {
      type: Array,
    }
  },
  mixins: [formatter],
  data() {
    return {
      catalogue: undefined
    }
  },
  created() {
    if (this.catalogues.length > 0) {
      this.catalogue = this.catalogues[0];
    }
  },
  methods: {
    openPhotoModal(index) {
      this.$modal.show(
        DesktopPhotoModal,
        {
          catalogue: this.catalogue,
          index
        },
        {
          wid1th: "600px",
          height: "auto",
        }
      );
    },
  }
};
</script>
