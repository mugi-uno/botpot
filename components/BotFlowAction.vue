<template lang="pug">
.bot-flow-action
  el-row(type='flex' justify="space-between")
    el-row(type='flex')
      .tag-area
        el-tag(color='hsla(316, 100%, 97%, 1)')
          i.fa.fa-fire
          | Action
      .kind-area
        el-select(
          size="small"
          :value='action.kind'
          @change='$emit("update", ["kind", $event])'
          placeholder='Type'
        )
          el-option(
            v-for='kind in kinds'
            :key='kind.value'
            :label='kind.label'
            :value='kind.value'
          )
    .delete-area
      el-button(
          size="small"
          type='danger'
          plain
          @click='$emit("delete")'
        )
          i.fa.fa-times
          span Delete
  el-row(type='flex')
    .action-area.flex-streach
      request-action(
        :data='action.data'
        @update='$emit("update", [...$event])'
      )
</template>

<script>
import RequestAction from './actions/RequestAction';

export default {
  components: {
    RequestAction
  },
  data () {
    return {
      kinds: [{
        value: 'request',
        label: 'Web Request'
      }]
    };
  },
  props: ['action']
};
</script>

<style lang="scss" scoped>
.tag-area {
  width: 100px;

  i {
    font-size: 1.1em;
    margin-right: 5px;
  }
}
.kind-area {
  width: 200px;
}
.action-area {
  margin-top: 0.5rem;
}
</style>
