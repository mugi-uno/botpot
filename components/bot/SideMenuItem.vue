<template lang="pug">
el-menu-item(
  :index='index'
)
  | {{name}}
</template>

<script>
export default {
  props: ['flow', 'index'],
  computed: {
    name () {
      if (this.flow.name) return this.flow.name;
      return '(No Name)';
    }
  }
};
</script>