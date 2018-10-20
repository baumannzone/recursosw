<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Resources</h1>
        <template v-for="(resource, index) in resources">
          <div :key="index">
            <span>{{ resource.name }}</span>
            <span> | </span>

            <span>({{ resource.likesCount }}) likes</span>
            <v-btn
              v-if="!likes[resource.id]"
              @click="like(resource)">Like</v-btn>
            <span
              v-if="likes[resource.id]"> - You liked!</span>

            <span> | </span>

            <span>({{ resource.favsCount }}) favs</span>
            <v-btn
              v-if="!favs[resource.id]"
              @click="addFavs(resource)">+Fav</v-btn>
            <span
              v-if="favs[resource.id]"> - You favourited!</span>

            </div>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from '../main'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      resources: []
    }
  },
  computed: {
    ...mapGetters(['getUserData', 'likes', 'favs'])
  },
  methods: {
    liked (id) {
      return this.likes[id]
    },
    favourited (id) {
      return this.favs[id]
    },
    like (resource) {
      if (this.getUserData) {
        const userId = this.getUserData.id
        const data = { [userId]: true }
        this.likes[resource.id] = true
        this.getUserData.likes[resource.id] = true
        db.doc(`resources/${resource.id}/likes/${userId}`).set(data)
          .then(() => {
            this.$store.dispatch('updateUserData', { likes: this.getUserData.likes })
          })
      }
    },
    addFavs (resource) {
      if (this.getUserData) {
        const userId = this.getUserData.id
        const data = { [userId]: true }
        this.favs[resource.id] = true
        this.getUserData.favs[resource.id] = true
        db.doc(`resources/${resource.id}/favs/${userId}`).set(data)
          .then(() => {
            this.$store.dispatch('updateUserData', { favs: this.getUserData.favs })
          })
      }
    }
  },
  firestore () {
    return {
      resources: db.collection('resources').orderBy('createdAt')
    }
  }
}
</script>
