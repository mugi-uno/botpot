<template lang="pug">
.request-action
  el-row(type='flex' align='middle')
    .url-input
      el-input(
        size="small"
        placeholder='Request Url'
        :value='data.url'
        @input='$emit("update", ["data", "url", $event])'
      )
        template(slot='prepend')
          i.fa.fa-link
    .method-select
      el-select(
        size="small"
        :value='data.method'        
        @change='$emit("update", ["data", "method", $event])'
        placeholder='Method'
      )
        el-option(
          v-for='method in methods'
          :key='method.value'
          :label='method.label'
          :value='method.value'
        )

</template>

<script>
export default {
  data () {
    return {
      methods: [
        { value: 'get', label: 'GET' },
        { value: 'post', label: 'POST' }
      ]
    };
  },
  props: ['data']
};
</script>

<style lang="scss" scoped>
.method-select {
  width: 95px;
}
.url-input {
  flex-grow: 1;
}
</style>
