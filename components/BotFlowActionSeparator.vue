<template lang="pug">
.bot-flow-action-separator
  .separator
    el-tooltip(
      effect='dark'
      content='Add Action'
      placement='right'
    )
      el-button.add-button(
        size='mini'
        @click='$emit("addAction")'
      )
        i.fa.fa-plus
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
$line-width: 6px;
$add-buton-size: 12px;

.separator {
  position: relative;
  min-height: 35px;
  border-left: $line-width solid rgba(64, 158, 255, .2);
  &::after {
    content: "";
    position: absolute; 
    bottom: $line-width * -1.5;
    left: $line-width * -2.0;
    border-top: $line-width * 1.5 solid rgba(64, 158, 255, .2);
    border-left: $line-width * 1.5 solid transparent;
    border-right: $line-width * 1.5 solid transparent;
  }
  margin-bottom: $line-width * 1.5;
  margin-left: 50px;

  .add-button {
    border-radius: 50%;
    font-size: 10px;
    height: 20px;
    left: -13px;
    line-height: 16px;
    opacity: 0.5;
    padding: 0px;
    position: absolute;
    text-align: center;
    top: 9px;
    width: 20px;
    &:hover {
      opacity: 1.0;
    }
  }
}
</style>
