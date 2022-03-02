<template>
  <div class="modal-content">
    <header class="modal-header" :class="classes">
      <h3 class="modal-title">
        <i :class="icon"></i>
        {{ title }}
      </h3>
      <button type="button"
              class="close"
              @click.stop="$dismiss"
              v-if="showDismissButton"></button>
    </header>
    <section class="modal-body">
      <div class="message-text" v-html-custom="message"></div>
    </section>
    <footer class="modal-footer">
      <button type="button"
              class="button is-cancel"
              v-if="showCancelButton"
              @click.stop="$dismiss">
        취소
      </button>

      <button type="button"
              class="button is-primary"
              @click.stop="$close">
        확인
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String,
    message: String,
    classes: String,
    showDismissButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: false
    }
  }
}
</script>
