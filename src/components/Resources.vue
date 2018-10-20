<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <template v-for="resource in resources">
          <ResourceCard :data="resource" :key="resource.id"/>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ResourceCard from './ResourceCard'

export default {
  components: { ResourceCard },
  data: () => ({
    resources: [
      {
        id: '1234567',
        name: 'Recurso 1',
        shortDesc: 'lorem ipsum lorem ipsum lorem ipsum',
        tags: [ 'developer', 'web' ],
        likesCount: 27,
        likes: {
          user: true,
          skdjbfjsdbnfkjsdnfksdjn: true,
          sakjdbsajkbdsakjbdjkasb: true
        },
        favsCount: 10,
        favs: {
          skdjbfjsdbnfkjsdnfksdjn: true,
          sakjdbsajkbdsakjbdjkasb: true
        },
        media: {
          mainImg: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'
        }
      },
      {
        id: '3456789',
        name: 'Recurso 2',
        shortDesc: 'lorem2 ipsum lorem2 ipsum lorem2 ipsum',
        tags: [ 'developer', 'web' ],
        likesCount: 27,
        likes: {
          skdjbfjsdbnfkjsdnfksdjn: true,
          sakjdbsajkbdsakjbdjkasb: true
        },
        favsCount: 10,
        favs: {
          user: true,
          skdjbfjsdbnfkjsdnfksdjn: true,
          sakjdbsajkbdsakjbdjkasb: true
        },
        media: {
          mainImg: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'
        }
      }
    ]
  })
}
</script>
