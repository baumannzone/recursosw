<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-chip
          label
          small
          v-for="(_tag, idx) in tags"
          :key="idx"
          text-color
          :selected="_tag == tag"
          @click="goTo(_tag)">{{ _tag }}
        </v-chip>
        <template v-for="resource in (shadowResources || resources)">
          <ResourceCard :data="resource" :key="resource.id"/>
        </template>
        <div class="text-xs-center" @click="more()" v-if="loadMore">
          <v-btn>
            Load more
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ResourceCard from './ResourceCard'
import services from '@/services'
import { mapGetters } from 'vuex'
import tags from '@/utils/tags'

const PAGE = 10
export default {
  components: { ResourceCard },
  data: () => ({
    resources: [],
    shadowResources: null,
    tag: '',
    tags: tags,
    limit: PAGE,
    page: 1,
    loadMore: true
  }),
  computed: {
    ...mapGetters([ 'getUserData', 'likes', 'favs' ])
  },
  methods: {
    more () {
      this.limit += PAGE
      this.shadowResources = this.resources
      if (this.$firestoreRefs && this.$firestoreRefs.resources) {
        this.$unbind('resources')
      }
      if (this.$bind) {
        this.$bind('resources', services.getResources(this.limit, this.tag))
          .then(items => {
            if (this.shadowResources.length === this.resources.length) {
              this.loadMore = false
            }
            this.shadowResources = null
          })
      }
    },
    goTo (tag) {
      this.$router.push({ name: 'Tag', params: { tag } })
    }
  },
  watch: {
    getUserData () {
      const user = this.getUserData
      if (user) {
        this.resources.map(item => ({
          ...item,
          liked: this.likes[ item.id ],
          favourited: this.favs[ item.id ]
        }))
      }
    },
    '$route' (to, from, other) {
      if (to.name === 'Tag' && to.params.tag !== this.tag) {
        this.tag = to.params.tag
        this.shadowResources = this.resources
        if (this.$firestoreRefs && this.$firestoreRefs.resources) {
          this.$unbind('resources')
        }
        if (this.$bind) {
          this.$bind('resources', services.getResources(this.limit, this.tag))
            .then(items => { this.shadowResources = null })
        }
      }
    }
  },
  firestore () {
    const tag = this.tag || this.$route.params.tag
    return {
      resources: services.getResources(this.limit, tag, this.startAt)
    }
  },
  created () {
    console.log(tags)
    this.tag = this.$route.params.tag
  }
}
</script>
