<template>
  <div class="popup_layer txt">
    <div class="popup_contents">
      <p class="txt_set" v-html-custom="text"></p>
    </div>
    <div class="popup_footer">
      <div class="bt_3rd">
        <button
          type="button"
          class="bt_popup"
          @click.stop="onCancelClicked()"
          v-if="showCancelButton"
        >
          취소
        </button>
        <button
          type="button"
          class="bt_popup black"
          @click.stop="onOkClicked()"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    showCancelButton: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onOkClicked() {
      this.$attrs.resolve();
      this.$emit("close");
    },
    onCancelClicked() {
      this.$attrs.reject();
      this.$emit("close");
    }
  }
}
</script>
