<!-- CurrentQuery.vue -->
<template>
  <div>
    {{ query }}
  </div>
</template>

<script>
import { Component } from 'vue-instantsearch'

export default {
  mixins: [Component],
  computed: {
    query () {
      return this.searchStore.query
    }
  }
}
</script>
