<template>
  <div class="review_star">
      <span class="star">
          <i :style="{'width':`${percentage}%`}"></i>
      </span>
      <slot>

      </slot>
  </div>
</template>

<script>
export default {
  name: 'StarRatingViewer',
  props: {
    rate: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    percentage() {
      return this.rate * 20;
    },
  },
};
</script>

<style scoped>

</style>
