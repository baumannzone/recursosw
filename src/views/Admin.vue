<template>
  <section class="admin">
    <h1>Admin page</h1>
  </section>
</template>

<script>
import rules from '@/utils/rules'

export default {
  name: 'Admin',
  created () {
    this.rules = rules
  },
  data: () => {
    return {
      isLoading: false
    }
  },
  methods: {}
}

</script>

<style scoped lang="stylus"></style>
