<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>ADMIN USERS</h1>
          <span v-for="(user, i) in (shadowUsers || users)" :key="i">
            <UserCard :user="user" />
          </span>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { db } from '@/config'
import UserCard from './UserCard.vue'

export default {
  name: 'AdminUsers',
  components: {
    UserCard
  },
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
