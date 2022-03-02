<template>
  <input @keydown="onKeydown" @input="onChangeValue" v-model="numberValue" :placeholder="placeholder"/>
</template>

<script>
export default {
  name: 'NumberInput',
  props: {
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: [String, Number],
    }
  },
  data() {
    return {
      numberValue: this.value,
    };
  },
  methods: {
    allowsKey(e) {
      return ['Delete', 'Backspace'].includes(e.key) || ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'z'].includes(e.key));
    },
    isNumber(e) {
      return /\d/.test(e.key);
    },
    onKeydown(e) {
      if (!this.isNumber(e) && !this.allowsKey(e)) {
        // console.warn('only number');
        e.preventDefault();
      }
    },
    onChangeValue() {
      this.numberValue = this.numberValue.replace(/\D/gi, '');
      this.$emit('input', this.numberValue);
    },
  },
};
</script>

<style scoped>

</style>
