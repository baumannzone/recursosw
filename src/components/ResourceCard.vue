<template>
  <v-card flat>
    <div class="resource pa-2 mb-2">
      <div class="resource-img">
        <img :src="data.media.mainImg" width="85px"/>
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
          <div class="actions">
            <v-chip outline small class="mr-1">
              <v-icon>
                keyboard_arrow_up
              </v-icon>
              {{ data.likesCount }}
            </v-chip>
            <v-chip outline small>
              <v-icon :color="likeColor[data.liked]">
                {{ likeIcon[data.liked] }}
              </v-icon>
              <!--{{ data.favsCount }}-->
            </v-chip>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'ResourceCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    likeIcon: {
      true: 'star',
      false: 'star_border'
    },
    likeColor: {
      true: 'yellow accent-4',
      false: 'gray'
    }
  }),
  methods: {
    deleteResource () {
      this.$store.dispatch('deleteResource', this.data.id)
        .then(() => {
          console.log('Document successfully deleted!')
        })
        .catch((error) => {
          console.error('Error removing document: ', error)
        })
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
