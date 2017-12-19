<template lang="pug">
  el-input(
    placeholder='Token' size='mini'
    :value='maskedValue'
    @input='$emit("input", $event)'
    @focus='setVisible(true)'
    @blur='setVisible(false)'
  )
    template(slot='prepend')
      i.fa.fa-key
</template>

<script>
export default {
  data () {
    return {
      visible: false
    };
  },
  props: ['value'],
  computed: {
    maskedValue () {
      return this.visible
        ? this.value
        : ''.padStart((this.value || '').length, '*');
    }
  },
  methods: {
    setVisible (value) {
      this.visible = value;
    }
  }
};
</script>
