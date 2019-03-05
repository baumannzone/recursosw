<template>
  <v-card flat class="user mb-3">
    <div class="user-img">
      <img :src="user.photoUrl" width="85px"/>
    </div>
    <div class="user-content pl-3 mb-3">
      <div class="top">
        <div class="title">
          <span class="user-title">{{ user.displayName }}</span>
        </div>
        <div>{{ user.email }}</div>
      </div>
      <div class="bottom">
        <user-roles :roles="user.roles" @changeRole="changeRole"/>
      </div>
    </div>
  </v-card>
</template>

<script>
import { db } from '@/config'
import s from '@/services'
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
  methods: {
    changeRole (val) {
      const obj = { roles: val }
      s.updateUserRole({ id: this.user.id, ...obj })
        .then(() => {
          console.debug('Role Updated ;)')
        })
        .catch((err) => {
          console.debug('Error [updateUserRole]')
          console.error(err.toString())
        })
      // This 💩 isn't working
      // this.$store.dispatch('updateUser', { id: this.user.id, val })
      //   .then(res => alert('OK'))
    }
  },
  firestore: () => ({ users: db.collection('users') })
}

</script>

<style scoped lang="stylus">
.user
  display flex
  position relative
  border-bottom 1px solid #eaeaea
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
