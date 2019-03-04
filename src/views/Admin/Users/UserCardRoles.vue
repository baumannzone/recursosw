<template>
  <span> R: {{ roles }} </span>
</template>

<script>

export default {
  name: 'UserCardRoles',
  props: {
    roles: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {}
  },
  computed: {},
  methods: {}
}

</script>

<style scoped lang="stylus">
</style>
