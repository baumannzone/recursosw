<template>
  <div class="d-flex">
    <template v-for="(rol, key) in renderRoles">
      <v-switch v-model="roles[key]" persistent-hint :hint="key" :key="key" @change="updateRole(key)"></v-switch>
    </template>
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
    updateRole (key) {
      const data = {}
      data[key] = this.roles[key]
      this.$emit('changeRole', data)
      // this.$store.dispatch('updateUser', {
      //   id: 'XoQ2sP8Q9FcRGkuQA6BWh1ewcGT2',
      //   roles: {
      //     user: true
      //   }
      // })
      //   .then(res => alert('OK'))
    }
  }
}

</script>

<style scoped lang="stylus">
</style>
