<template lang="pug">
.bot-flow
  .bot-flow-item.trigger-item
    el-card
      bot-flow-trigger(
        :trigger='flow.trigger'
        @update='$emit("update", ["trigger", ...$event])'
        @generateUrlToken='$emit("generateUrlToken")'
      )
    bot-flow-action-separator(
      @addAction='$emit("addAction", 0)'
    )
  .bot-flow-item.action-item(
    v-for='(action, index) in flow.actions'
    :key='action.key'
  )
    el-card
      bot-flow-action(
        :action='action'
        @update='$emit("update", ["actions", index, ...$event])'
        @delete='$emit("deleteAction", index)'
      )
    bot-flow-action-separator(
      @addAction='$emit("addAction", index + 1)'
    )
  .bot-flow-item.finisher-item
    el-card
      bot-flow-finisher(
        :channels='channels'
        :trigger='flow.trigger'
        :finisher='flow.finisher'
        @fetchChannels='$emit("fetchChannels")'
        @update='$emit("update", ["finisher", ...$event])'
      )
  el-row(type='flex')
    .flex-streach
      el-input(
        placeholder='(Optional) Flow name'
        :value='flow.name'
        @input='$emit("update", ["name", $event])'
      )
        template(slot='prepend')
          i.fa.fa-tag
  el-row.delete-button-row(type='flex' justify="end")
    el-button(
      type='danger'
      plain
      @click='$emit("delete")'
    )
      i.fa.fa-times
      span Delete Flow
</template>

<script>
import BotFlowTrigger from './BotFlowTrigger';
import BotFlowFinisher from './BotFlowFinisher';
import BotFlowAction from './BotFlowAction';
import BotFlowActionSeparator from './BotFlowActionSeparator';

export default {
  components: {
    BotFlowTrigger,
    BotFlowFinisher,
    BotFlowAction,
    BotFlowActionSeparator
  },
  props: [
    'channels', 'flow'
  ]
};
</script>

<style lang="scss" scoped>
.finisher-item {
  margin-bottom: 2rem;
}
.delete-button-row {
  margin-top: 3rem;
}
</style>
