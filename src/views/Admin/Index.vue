<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs v-model="active" color="grey lighten-5">
            <v-tab v-for="(comp, idx) in components" :key="idx" ripple> {{ comp.displayName }} </v-tab>
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

import TabUsers from './Users/Index.vue'
import TabResources from './Resources/Index.vue'

export default {
  name: 'AdminPage',
  components: {
    TabUsers,
    TabResources
  },
  data: () => {
    return {
      active: 0
    }
  },
  computed: {
    currentTabComponent () {
      return this.components[this.active].src
    },
    components () {
      return [
        { displayName: this.$t('common.users'), name: 'Users', src: TabUsers },
        { displayName: this.$t('common.resources'), name: 'Resources', src: TabResources }
      ]
    }
  }
}

</script>

<style scoped lang="stylus"></style>
