<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <template v-for="resource in resources">
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

const PAGE = 10
export default {
  components: { ResourceCard },
  data: () => ({
    resourceList: [],
    ref: '',
    limit: PAGE,
    loadMore: true
  }),
  computed: {
    ...mapGetters([ 'getUserData', 'search' ]),
    resources () {
      return this.resourceList
    }
  },
  methods: {
    getResourcesByTag () {
      const tag = this.$route.params.tag
      this.ref = services.getResourcesByTag(this.limit, tag)
      this.ref.onSnapshot((snapshot) => {
        console.log('>>', this.limit, snapshot.docs.length)
        this.loadMore = this.limit === snapshot.docs.length
        this.resourceList = snapshot.docs
          .map(doc => {
            console.log('datos:', doc)
            return {
              id: doc.id,
              ...doc.data(),
              liked: !!this.getUserData && !!this.getUserData.likes[ doc.id ],
              favourited: !!this.getUserData && !!this.getUserData.favs[ doc.id ]
            }
          })
      }, (error) => {
        console.warn('[getResourcesByTag]: ', error.toString())
      })
    },
    getResources (limit) {
      this.ref = services.getResources(limit || this.limit, this.search)
      this.ref.onSnapshot((snapshot) => {
        console.log(this.limit, snapshot.docs.length)
        this.loadMore = this.limit === snapshot.docs.length
        this.resourceList = snapshot.docs
          .map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
              liked: !!this.getUserData && !!this.getUserData.likes[ doc.id ],
              favourited: !!this.getUserData && !!this.getUserData.favs[ doc.id ]
            }
          })
      }, (error) => {
        console.warn('[getResources]: ', error.toString())
      })
    },
    more () {
      this.limit += PAGE
      this.getResources(this.limit)
    }
  },
  watch: {
    getUserData () {
      console.log('...watching...', this.getUserData)
      this.resourceList = this.resourceList
        .map(item => {
          return {
            ...item,
            liked: !!this.getUserData && !!this.getUserData.likes[ item.id ],
            favourited: !!this.getUserData && !!this.getUserData.favs[ item.id ]
          }
        })
    }
  },
  created () {
    if (this.$route.name === 'Tag') {
      this.getResourcesByTag()
    } else {
      this.getResources()
    }
  }
}
</script>
