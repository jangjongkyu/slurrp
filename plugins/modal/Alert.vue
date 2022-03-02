<template>
  <div class="modal-alert">
    <div class="dialog-content">
      <h3 class="dialog-c-title">{{ title }}</h3>
      <p class="dialog-c-text">{{ text }}</p>
    </div>
    <div class="vue-dialog-buttons">
      <button
        type="button"
        class="vue-dialog-button"
        @click.stop="$emit('close')"
      >
        확인
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "text"]
};
</script>
