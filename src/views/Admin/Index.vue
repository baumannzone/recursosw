<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs v-model="active" color="grey lighten-5">
            <v-tab v-for="(comp, idx) in components" :key="idx" ripple> {{ comp.name }} </v-tab>
            <v-tab-item v-for="(comp, idx) in components" :key="idx">
              <v-card flat>
                <v-card-text>
                  <component :is="currentTabComponent"></component>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>

import TabUsers from './AdminUsers.vue'
import TabResources from './AdminResources.vue'

export default {
  name: 'Admin',
  components: {
    TabUsers,
    TabResources
  },
  data: () => {
    return {
      active: 0,
      components: [
        { name: 'Users', src: TabUsers },
        { name: 'Resources', src: TabResources }
      ]
    }
  },
  computed: {
    currentTabComponent () {
      return this.components[this.active].src
    }
  }
}

</script>

<style scoped lang="stylus"></style>
