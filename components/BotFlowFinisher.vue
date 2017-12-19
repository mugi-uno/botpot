<template lang="pug">
.bot-flow-finisher
  el-row(type='flex')
    .tag-area
      el-tag
        i.fa.fa-check-circle
        | Finisher
    .kind-area
      el-select(
        size="small"
        :value='finisher.kind'        
        @change='$emit("update", ["kind", $event])'
        placeholder='Type'
      )
        el-option(
          v-for='kind in kinds'
          :key='kind.value'
          :label='kind.label'
          :value='kind.value'
        )
  .action-area-parent
    template(v-if='finisher.kind === "message"')
      .action-area
        el-row(type='flex')
          el-input.flex-streach( 
            type='textarea'
            placeholder='Message'
            :autosize='{ minRows: 3 }'
            :value='finisher.data.word'
            @input='$emit("update", ["data", "word", $event])'
          )
        el-row(type='flex')
          el-select(
            size="small"
            :value='finisher.data.channel'
            @change='$emit("update", ["data", "channel", $event])'
            placeholder='Channel'
          )
            el-option(
              v-for='channel in selectableChannels'
              :key='channel.id'
              :label='channel.name'
              :value='channel.id'
            )
          el-button.button(
            size="small"
            @click='$emit("fetchChannels")'
          )
              | Get Channels
</template>

<script>
export default {
  data () {
    return {
      kinds: [
        { value: 'nothing', label: 'Nothing' },
        { value: 'message', label: 'Message' }
      ]
    };
  },
  props: ['finisher', 'trigger', 'channels'],
  computed: {
    selectableChannels () {
      const defaultChannelText = this.isWordTrigger ? '(Trigger Channel)' : 'Nothing';
      const channels = this.channels && this.channels.length ? this.channels : [];

      return [
        { id: '', name: defaultChannelText },
        ...(
          channels.map(c => ({
            id: c.id,
            name: `#${c.name}`
          }))
        )
      ];
    },

    isWordTrigger () {
      return this.trigger.kind === 'word';
    }
  }
};
</script>

<style lang="scss" scoped>
.delete-button i {
  margin-right: 5px;
}
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
