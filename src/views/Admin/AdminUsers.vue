<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>ADMIN USERS</h1>
          <span v-for="(user, i) in (shadowUsers || users)" :key="i">
            <v-card class="admin">
              <div class="resource pa-2 mb-2">{{ user.displayName }}</div>
            </v-card>
          </span>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { db } from '@/config'

export default {
  name: 'AdminUsers',
  data: () => {
    return {
      users: [],
      shadowUsers: null,
      isLoading: false
    }
  },
  methods: {},
  firestore: () => ({ users: db.collection('users') })
}

</script>

<style scoped lang="stylus"></style>
