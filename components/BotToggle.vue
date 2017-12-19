<template lang="pug">
el-row(type='flex')
  .left-area
    el-radio-group(
      size='large'
      :value='running'
      @change='toggle'
    )
      el-radio-button(
        label='false'
      )
        i.fa.fa-stop-circle-o
        span OFF
      el-radio-button(
        label='true'
      )
        i.fa.fa-play
        span ON
  .right-area
    el-button.button(
      @click='$emit("syncStore")'
    )
      i.fa.fa-refresh
      span SYNC
</template>

<script>
export default {
  props: [
    'running'
  ],
  methods: {
    toggle () {
      this.running ? this.$emit('stop') : this.$emit('start');
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  justify-content: space-between;
}
</style>
