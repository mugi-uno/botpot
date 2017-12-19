<template lang="pug">
  el-input( 
    size="small"
    placeholder='Cron style schedule : e.g.) 00 12 1 * *'
    :value='data.schedule'
    @input='$emit("update", ["schedule", $event])'
  )
    template(slot='prepend')
      i.fa.fa-clock-o
</template>

<script>
export default {
  props: ['data']
};
</script>
