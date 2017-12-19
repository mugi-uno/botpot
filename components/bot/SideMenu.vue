<template lang="pug">
el-menu(
  :default-openeds="['submenu']"
  :default-active='`${activeFlowIndex}`'
  @select='$emit("select", $event)'
)
  el-submenu(
    index='submenu'
  )
    template(slot='title')
      span Flows
    side-menu-item(
      v-for='(flow, index) in flows'
      :index='`${index}`'
      :key='flow.key'
      :flow='flow'
    )
    el-menu-item(
      index='add-button'
    )
      el-button.add-button(
        size='small'
        @click='$emit("addFlow")'
      )
        i.fa.fa-plus
        span ADD FLOW
</template>

<script>
import SideMenuItem from './SideMenuItem';

export default {
  components: {
    SideMenuItem
  },
  props: ['flows', 'activeFlowIndex']
};
</script>