<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>ADMIN RESOURCES</h1>
          <span v-for="(resource, i) in (shadowResources || resources)" :key="i">
            <v-card class="admin">
              <div class="resource pa-2 mb-2">{{ resource.name }}</div>
              <v-select
                v-model="resource.status"
                :items="status"
                :menu-props="{ maxHeight: '400' }"
                label="Status"
                @input="updateStatus(resource)"
              ></v-select>
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
      status: ['approved', 'rejected', 'pending'],
      shadowResources: null,
      isLoading: false
    }
  },
  methods: {
    updateStatus (resource) {
      return this.$store.dispatch('updateResource', {
        id: resource.id,
        payload: { status: resource.status }
      })
    }
  },
  firestore: () => ({ resources: db.collection('resources') })
}

</script>

<style scoped lang="stylus"></style>
