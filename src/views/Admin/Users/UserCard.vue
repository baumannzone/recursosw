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
            <user-roles :roles="user.roles" />
          </div>
        </div>
    </div>
  </v-card>
</template>

<script>
import { db } from '@/config'
import UserRoles from './UserCardRoles.vue'

export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    UserRoles
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
