<template>
  <v-card flat>
    <div class="resource pa-2 mb-2">
      <div class="resource-img">
        <img :src="data.media['128'] || data.media.mainImg" width="85px"/>
      </div>
      <div class="resource-content pl-3">
        <div class="top">
          <div class="title"> {{ data.name }}</div>
          <div>{{ data.shortDesc }}</div>
          <template v-if="$store.getters.isAuthenticated">
            <button class="red--text" @click="deleteResource">Delete <small>[{{ data.id }}]</small></button>
          </template>
        </div>
        <div class="bottom">
          <div class="tags">
            <v-chip
              label
              small
              v-for="(tag, idx) in data.tags"
              :key="idx"
              text-color
            >
              {{ tag }}
            </v-chip>
          </div>
          <div class="actions" v-if="isAuthenticated">
            <v-chip outline small class="mr-1" @click="likeResource()">
              <v-icon :color="likeColor[!!data.liked]">
                thumb_up
              </v-icon>
              <span style="padding-left:5px">{{ data.likesCount }}</span>
            </v-chip>
            <v-chip outline small @click="favResource()">
              <v-icon :color="favColor[!!data.favourited]">
                {{ favIcon[data.favourited] }}
              </v-icon>
            </v-chip>
          </div>
          <div v-else>
            <v-chip outline small disabled>
              <v-icon>thumb_up</v-icon>
              <span class="pl-1">{{ data.likesCount }}</span>
            </v-chip>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ResourceCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
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
    // blue darken-2
  }),
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    deleteResource () {
      this.$store.dispatch('deleteResource', this.data.id)
        .then(() => {
          console.log('Document successfully deleted!')
        })
        .catch((error) => {
          console.error('Error removing document: ', error)
        })
    },
    favResource () {
      if (!this.data.favourited && this.unlocked && this.isAuthenticated) {
        this.unlocked = false
        this.$store.dispatch('favResource', this.data.id)
          .then(() => {
            this.unlocked = true
          })
          .catch(error => {
            this.unlocked = true
            console.error({ error })
          })
      } else {
        this.$store.dispatch('removeFav', this.data.id)
      }
    },
    likeResource () {
      if (!this.data.liked && this.unlocked && this.isAuthenticated) {
        this.unlocked = false
        this.$store.dispatch('likeResource', this.data.id)
          .then(() => {
            this.unlocked = true
          })
          .catch(error => {
            this.unlocked = true
            console.error({ error })
          })
      } else {
        this.$store.dispatch('removeLike', this.data.id)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .resource
    display flex
    position relative
    .resource-img
      display block
    .resource-content
      width 100%
      display flex
      flex-direction column
      justify-content space-between
      .bottom
        display flex
        flex-direction row
        justify-content space-between

</style>
