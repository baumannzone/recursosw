<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <UserCard v-for="(user, i) in users" :key="i" :user="user"/>
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
      users: []
    }
  },
  methods: {},
  firestore: () => ({ users: db.collection('users') })
}

</script>

<style scoped lang="stylus"></style>
