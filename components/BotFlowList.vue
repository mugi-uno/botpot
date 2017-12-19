<template lang="pug">
.bot-flow-list
  bot-flow(
    v-if='flowExists'
    :flow='flow'
    :channels='channels'
    @fetchChannels='$emit("fetchChannels")'
    @update='$emit("update", [activeFlowIndex, ...$event])'
    @delete='$emit("deleteFlow", activeFlowIndex)'
    @addAction='$emit("addAction", { flowIndex: activeFlowIndex, index: $event })'
    @deleteAction='$emit("deleteAction", { flowIndex: activeFlowIndex, index: $event })'
  )
</template>

<script>
import BotFlow from './BotFlow';

export default {
  components: {
    BotFlow
  },
  props: ['channels', 'flows', 'activeFlowIndex'],
  computed: {
    flow () {
      return this.flows[this.activeFlowIndex];
    },

    flowExists () {
      return !!this.flow;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-button {
  margin-top: 1rem;
  width: 100%;
}
</style>
