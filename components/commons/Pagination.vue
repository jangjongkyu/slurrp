<template>
  <div class="paging mgt20">
    <a class="prev" @click="onClickPage(page - 1)">이전 페이지</a>
    <a v-for="page in range" v-bind:key="page" :class="getClazz(page)" @click="onClickPage(page)">{{page}}</a>
    <a class="next" @click="onClickPage(page + 1)">다음 페이지</a>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    value: {
      type: Object,
    },
    page: {
      type: Number,
      default: 1
    },
    itemsPerPage: {
      type: Number,
    },
    totalItems: {
      type: Number,
    },
    totalPages: {
      type: Number,
    }
  },
  data() {
    return {
      pageParams: {
        ...this.value,
        page: this.page,
        itemsPerPage: this.itemsPerPage,
        totalItems: this.totalItems,
        totalPages: this.totalPages,
      },
      throttle: false
    }
  },
  computed: {
    range() {
      const min = Math.max(this.pageParams.page - 4, 1);
      const max = Math.min(min + 9, this.lastPage);
      const range = [];
      for (let i = Math.max(max - 9, 1); i <= max; i++) {
        range.push(i);
      }
      return range;
    },
    lastPage() {
      if (this.totalPages) {
        return this.totalPages;
      }
      if (this.totalItems) {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      }
      return 0;
    },
  },
  methods: {
    getClazz(page) {
      const clazz = [];
      if (page === this.pageParams.page) {
        clazz.push('on');
      }
      return clazz;
    },
    onClickPage(page) {
      if(page < 1 || page > this.lastPage) return;
      if(!this.throttle) {
        this.throttle = true;
        this.pageParams.page = page;
        this.$emit('input', this.pageParams);
        setTimeout(() => {
          this.throttle = false;
        }, 500);
      }
    },
  },
  watch: {
    page(nv) {
      if (nv !== this.pageParams.page) {
        this.pageParams.page = nv;
      }
    },
  },
};
</script>

<style scoped>
a { cursor: pointer; }
</style>
