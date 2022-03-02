<template>
  <div class="frequantly_wrap">
    <h4 class="title_main">
      자주 찾는 카테고리 <span>시즌 인기 상품군</span>
    </h4>
    <div class="frequantly_box">
      <div
        v-for="(category, categoryIndex) in categories"
        :key="`category-${categoryIndex}`"
        class="frequantly_inner"
      >
        <nuxt-link :to="{ path: `/category?id=${category.dispClsfNo}` }" >
          <div class="frequantly_img">
            <img  :src="getImageUrl(category.tnImgPath)" onerror="this.src='/images/no-img.jpg'" alt="" />
          </div>
          <div class="title">{{ category.dispClsfNm }}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Formatter from "@/assets/mixins/formatter";

export default {
  name: "FavoriteMenu",
  mixins: [Formatter],
  
  async fetch() {
    await this.fetchCategories();
  },
  props: {
    category: {
      type: Object,
      default: () => {}
    },
  },
  methods: {
    async fetchCategories() {
      this.categories = await this.$axios.$get(`/api/main/${this.category.categoryNo}/categories`);
    },
  },
  data() {
    return {
      categories: [],
    }
  }
};
</script>
