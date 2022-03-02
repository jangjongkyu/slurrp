<template>
  <div class="main_st">
    <h4 class="main_st_title">
      자주 찾는 카테고리   <span class="fa_l">시즌 인기 상품군</span>
    </h4>
    <div class="main_st_cate">
      <ul>
        <li v-for="(category, categoryIndex) in categories" :key="`category-${categoryIndex}`">
          <nuxt-link :to="{ path: `/category?id=${category.dispClsfNo}` }" >
            <span><img :src="getImageUrl(category.tnImgPath)" onerror="this.src='/images/no-img.jpg'" alt="" /></span>
            <div class="text">{{ category.dispClsfNm }}</div>
          </nuxt-link>
        </li>
      </ul>
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
    },
  };

</script>
