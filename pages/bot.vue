<template lang="pug">
section.container
  bot-configuration(
    :token='token'
    :running='running'
    @updateToken='update(["token", $event])'
    @start='start'
    @stop='stop'
    @syncStore='syncStore'
  )
  el-container
    el-aside(
      width='200px'
    )
      side-menu(
        :flows='flows'
        :activeFlowIndex='activeFlowIndex'
        @addFlow='addFlow'
        @select='updateFlowIndex'
      )
    el-main
      bot-flow(
        v-if='flowExists'
        :flow='flow'
        :channels='channels'
        @fetchChannels='fetchChannels'
        @update='update(["flows", activeFlowIndex, ...$event])'
        @delete='deleteFlow'
        @addAction='addAction'
        @deleteAction='deleteAction'
        @generateUrlToken='generateUrlToken'
      )
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import BotFlow from '../components/BotFlow';
import BotConfiguration from '../components/BotConfiguration';
import SideMenu from '../components/bot/SideMenu';

export default {
  components: {
    BotFlow,
    BotConfiguration,
    SideMenu
  },
  async fetch ({ store }) {
    await store.dispatch('bot/fetch');
    await store.dispatch('bot/fetchChannels');
  },
  computed: {
    ...mapState('bot', ['channels', 'flows', 'activeFlowIndex', 'token', 'running']),
    flow () {
      return this.flows[this.activeFlowIndex];
    },
    flowExists () {
      return !!this.flow;
    }
  },
  methods: {
    ...mapActions('bot', [
      'fetchChannels',
      'start',
      'stop',
      'syncStore'
    ]),
    ...mapMutations('bot', [
      'update',
      'updateFlowIndex',
      'addFlow',
      'deleteFlow',
      'addAction',
      'deleteAction',
      'generateUrlToken'
    ])
  }
};
</script>
