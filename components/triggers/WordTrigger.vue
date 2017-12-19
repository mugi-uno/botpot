<template lang="pug">
  el-input( 
    size="small"
    placeholder='Trigger word'
    :value='data.word'
    @input='$emit("update", ["word", $event])'
  )
    template(slot='prepend')
      i.fa.fa-comment
</template>

<script>
export default {
  props: ['data']
};
</script>
