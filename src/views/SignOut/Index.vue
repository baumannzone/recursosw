<template>
  <span></span>
</template>

<script>
export default {
  beforeMount () {
    this.$store.dispatch('userSignOut')
  }
}
</script>
