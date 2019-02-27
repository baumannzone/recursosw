<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Page not found</h1>
        <p>If you entered a web address please check it was correct</p>
        <p>You can also go to <router-link :to="{name: 'Home'}">Home Page</router-link></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {}
</script>
