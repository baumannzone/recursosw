<template>
  <v-layout>
    <v-flex xs12 sm10 offset-sm1 md8 offset-sm2 lg6 offset-lg3>
      <v-card>
        <v-img
          v-if="resource.media"
          :src="resource.media.mainImg" aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ resource.name }}</h3>
            <div>{{ resource.fullDesc || resource.shortDesc }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <div class="tags">
            <v-chip
              label
              small
              v-for="(tag, idx) in resource.tags"
              :key="idx"
              text-color
            >
              {{ tag }}
            </v-chip>
          </div>
          <div class="actions" v-if="isAuthenticated">
            <v-chip outline small class="mr-1" @click="likeResource(resource)">
              <v-icon :color="likeColor[!!liked(resource.id)]">
                thumb_up
              </v-icon>
              <span style="padding-left:5px">{{ resource.likesCount }}</span>
            </v-chip>
            <v-chip outline small @click="favResource(resource)">
              <v-icon :color="favColor[!!favourited(resource.id)]">
                {{ favIcon[favourited(resource.id)] }}
              </v-icon>
            </v-chip>
          </div>
          <div v-else>
            <v-chip outline small disabled>
              <v-icon>thumb_up</v-icon>
              <span class="pl-1">{{ resource.likesCount }}</span>
            </v-chip>
          </div>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from '../main'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      resource: { media: '' },
      unlocked: true,
      favIcon: {
        true: 'star',
        false: 'star_border'
      },
      favColor: {
        true: 'yellow accent-4',
        false: 'gray'
      },
      likeColor: {
        true: 'blue darken-2',
        false: 'gray'
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getUserData', 'likes', 'favs'])
  },
  methods: {
    liked (id) {
      return !!this.likes[id]
    },
    favourited (id) {
      return !!this.favs[id]
    },
    favResource (resource) {
      if (!this.favourited(resource.id) && this.unlocked && this.isAuthenticated) {
        this.unlocked = false
        this.$store.dispatch('favResource', resource.id)
          .then(() => {
            this.unlocked = true
          })
          .catch(error => {
            this.unlocked = true
            console.error({ error })
          })
      } else {
        this.$store.dispatch('removeFav', resource.id)
      }
    },
    likeResource (resource) {
      if (!this.liked(resource.id) && this.unlocked && this.isAuthenticated) {
        this.unlocked = false
        this.$store.dispatch('likeResource', resource.id)
          .then(() => {
            this.unlocked = true
          })
          .catch(error => {
            this.unlocked = true
            console.error({ error })
          })
      } else {
        this.$store.dispatch('removeLike', resource.id)
      }
    }
  },
  firestore () {
    return {
      resource: db.doc(`resources/${this.$route.params.id}`)
    }
  }
}
</script>