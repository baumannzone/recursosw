<template>
  <div>
    <span> R: {{ renderRoles }} </span>
    <button @click="updateRole()">UpdateRole</button>
  </div>
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
  methods: {
    updateRole () {
      this.$store.dispatch('updateUser', {
        id: 'XoQ2sP8Q9FcRGkuQA6BWh1ewcGT2',
        roles: {
          user: false
        }
      }).then(res => alert('OK'))
    }
  }
}

</script>

<style scoped lang="stylus">
</style>
