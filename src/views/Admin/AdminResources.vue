<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>ADMIN RESOURCES</h1>
          <span v-for="(resource, i) in (shadowResources || resources)" :key="i">
            <v-card class="admin">
              <div class="resource pa-2 mb-2">{{ resource.name }}</div>
            </v-card>
          </span>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { db } from '@/config'

export default {
  name: 'AdminResources',
  data: () => {
    return {
      resources: [],
      shadowResources: null,
      isLoading: false
    }
  },
  methods: {},
  firestore: () => ({ resources: db.collection('resources') })
}

</script>

<style scoped lang="stylus"></style>
