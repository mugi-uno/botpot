<template lang="pug">
el-row(type='flex')
  .logo-area
    span
      img.service-logo(src='/images/slack.svg')
  .configuration-area
    bot-toggle(
      :running='running'
      @start='$emit("start")'
      @stop='$emit("stop")'
      @syncStore='$emit("syncStore")'
    )
    bot-configuration-token-input.input-token(
      :value='token'
      @input='$emit("updateToken", $event)'
    )
</template>

<script>
import BotToggle from './BotToggle';
import BotConfigurationTokenInput from './BotConfigurationTokenInput';

export default {
  components: {
    BotToggle,
    BotConfigurationTokenInput
  },
  props: ['token', 'running']
};
</script>

<style lang="scss" scoped>
.service-logo {
  height: 80px;
}
.configuration-area {
  flex-grow: 1;
}
.input-token {
  margin-top: 5px;
}
</style>
