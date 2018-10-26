<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <template v-for="resource in resources">
          <ResourceCard :data="resource" :key="resource.id"/>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ResourceCard from './ResourceCard'
import services from '@/services'

export default {
  components: { ResourceCard },
  data: () => ({
    resourceList: []
  }),
  computed: {
    resources () {
      return this.resourceList
    }
  },
  methods: {
    getResources () {
      services.getResources()
        .onSnapshot((snapshot) => {
          this.resourceList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          console.log('RESOURCE List: ')
          console.log(this.resourceList)
        }, (error) => {
          console.log('[getResources]: ', error.toString())
        })
    }
  },
  created () {
    this.getResources()
  }
}
</script>
