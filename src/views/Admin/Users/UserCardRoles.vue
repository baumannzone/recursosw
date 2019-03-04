<template>
  <span> R: {{ renderRoles }} </span>
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
  computed: {
    renderRoles () {
      return {
        admin: this.roles.admin || false,
        editor: this.roles.editor || false,
        user: this.roles.user || false
      }
    }
  },
  methods: {}
}

</script>

<style scoped lang="stylus">
</style>
