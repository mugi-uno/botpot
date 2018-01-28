<template lang="pug">
  el-row(type="flex")
    .url-input.flex-streach
      el-input( 
        size="small"
        placeholder='URL token'
        :value='data.token'
        @input='$emit("update", ["token", $event])'
      )
        template(slot='prepend')
          span http://xxxxxx/
    el-button(
      size="small"
      @click="$emit('generate')"
    )
      | Generate
</template>

<script>
export default {
  props: ['data']
};
</script>
