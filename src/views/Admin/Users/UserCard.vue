<template>
    <v-card flat>
      <div class="user pa-2 mb-2">
        <div class="user-img">
          <img :src="user.photoUrl" width="85px"/>
        </div>
        <div class="user-content pl-3">
          <div class="top">
            <div class="title">
              <span class="user-title">{{ user.displayName }}</span>
            </div>
            <div>{{ user.email }}</div>
          </div>
          <div class="bottom">
            <div>{{ user.roles }}</div>
          </div>
        </div>
    </div>
    <!-- <div class="resource pa-2 mb-2">
      <div class="resource-img">
        <img :src="data.media['128'] || data.media.mainImg" width="85px"/>
      </div>
      <div class="resource-content pl-3">
        <div class="top">
          <div class="title"><a class="resource-title" @click="go(data.id)">{{ data.name }}</a></div>
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
              @click="goTo(tag)"
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
    </div> -->
  </v-card>
</template>

<script>
import { db } from '@/config'

export default {
  name: 'AdminUsers',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {}
  },
  methods: {},
  firestore: () => ({ users: db.collection('users') })
}

</script>

<style scoped lang="stylus">
.user
  display flex
  position relative
  .user-img
    display block
  .user-content
    width 100%
    display flex
    flex-direction column
    justify-content space-between
    .bottom
      display flex
      flex-direction row
      justify-content space-between
  .user-title
    color DarkSlateGray
</style>
