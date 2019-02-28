<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="admin">
            <h1>Admin Page</h1>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>

export default {
  name: 'Admin',
  data: () => {
    return {
      isLoading: false
    }
  },
  methods: {}
}

</script>

<style scoped lang="stylus"></style>
