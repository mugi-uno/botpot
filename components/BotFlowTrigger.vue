<template lang="pug">
.bot-flow-trigger
  el-row(type='flex')
    .tag-area
      el-tag(color='#ffffca')
        i.fa.fa-bolt
        | Trigger
    .kind-area
      el-select(
        size="small"
        :value='trigger.kind'        
        @change='$emit("update", ["kind", $event])'
        placeholder='Type'
      )
        el-option(
          v-for='kind in kinds'
          :key='kind.value'
          :label='kind.label'
          :value='kind.value'
        )
  el-row(type='flex')
    .action-area.flex-streach
      schedule-trigger(
        v-if='trigger.kind === "schedule"'
        :data='trigger.data'
        @update='$emit("update", ["data", ...$event])'
      )
      url-trigger(
        v-else-if='trigger.kind === "url"'
        :data='trigger.data'
        @update='$emit("update", ["data", ...$event])'
        @generate='$emit("generateUrlToken")'
      )
      word-trigger(
        v-else
        :data='trigger.data'
        @update='$emit("update", ["data", ...$event])'
      )
</template>

<script>
import WordTrigger from './triggers/WordTrigger';
import UrlTrigger from './triggers/UrlTrigger';
import ScheduleTrigger from './triggers/ScheduleTrigger';

export default {
  components: {
    WordTrigger,
    UrlTrigger,
    ScheduleTrigger
  },
  data () {
    return {
      kinds: [
        { value: 'word', label: 'Word' },
        { value: 'url', label: 'URL' },
        { value: 'schedule', label: 'Schedule' }
      ]
    };
  },
  props: ['trigger']
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
