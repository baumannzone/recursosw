<template>
  <div>
    <span> R: {{ roles }} </span>
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
  computed: {},
  methods: {
    updateRole () {
      this.$store.displatch('updateUser', {
        id: 'XoQ2sP8Q9FcRGkuQA6BWh1ewcGT2',
        name: 'Robinator'
      }).then(res => alert('OK'))
    }
  }
}

</script>

<style scoped lang="stylus">
</style>
