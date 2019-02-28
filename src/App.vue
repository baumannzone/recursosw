<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app disable-resize-watcher>
      <v-list dense>
        <v-list-tile v-for="(item, idx) in menuItems" :key="idx" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.displayName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app temporary fixed class="elevation-0">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"/>
      <v-toolbar-title class="headline text-uppercase cursor" @click="goHome">
        <!-- i18n Working -->
        <span>{{ $t('title.recurs') }}<span class="font-weight-light">{{ $t('title.OSW') }}</span></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="(item, idx) in menuItems">
          <v-btn flat
            v-if="show(item)"
            :to="item.path"
            :key="idx">{{ item.displayName }}</v-btn>
        </template>
        <!-- Lang Selector -->
        <v-menu bottom left>
          <v-btn slot="activator" flat>
            {{ currentLang }}
            <v-icon>language</v-icon>
          </v-btn>

          <v-list>
            <v-list-tile v-for="(l, i) in lang" :key="i" @click="selectLanguage(l)">
              <v-list-tile-title>{{ l.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import { debounce } from './utils/debounce'
export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      lang: [
        { title: 'ES' },
        { title: 'EN' }
      ]
    }
  },
  computed: {
    currentLang () {
      return this.$i18n.locale.toUpperCase()
    },
    menuItems () {
      return [
        { displayName: this.$t('navMenu.admin'), icon: 'star', path: '/admin', requireAuth: true, requireAdmin: true },
        { displayName: this.$t('navMenu.create'), icon: 'add', path: '/create', requireAuth: true },
        { displayName: this.$t('navMenu.signIn'), icon: 'contact_mail', path: '/signin', offAuthenticated: true },
        { displayName: this.$t('navMenu.signOut'), icon: 'reply', path: '/signout', requireAuth: true }
      ]
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    // Make this more readable
    // isLoggedIn
    // isAdmin
    // ...
    show (item) {
      if (item.offAuthenticated) {
        return !this.$store.getters.isAuthenticated
      } else if (item.requireAuth) {
        if (item.requireAdmin) {
          console.debug('Admin only!')
        }
        return this.$store.getters.isAuthenticated
      }
      return true
    },
    selectLanguage (lang) {
      this.$i18n.locale = lang.title.toLowerCase()
    }
  }
}
</script>

<style lang="stylus">
  .cursor:hover
    cursor pointer
</style>
