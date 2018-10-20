<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Users</h1>
        <template v-for="(user, index) in users">
          <div :key="index">{{user.displayName}}</div>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from '../main'
export default {
  data () {
    return {
      users: []
    }
  },
  firestore () {
    return {
      users: db.collection('users').orderBy('createdAt')
    }
  }
}
</script>
