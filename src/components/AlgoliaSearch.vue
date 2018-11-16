<template>
  <v-menu ref="searchMenuRef" max-height="400" v-model="searchMenuVisibility" :close-on-content-click="false"  nudge-bottom="10" lazy transition="scale-transition" offset-y full-width min-width="290px">
    <v-text-field slot="activator" @keyup="searchMenuVisibility=true" v-model="searchQuery" label="Quick Search" append-icon="search" single-line hide-details ></v-text-field>
    <v-layout row wrap>
      <v-flex xs12>
        <ais-index
          app-id="MXMGIRT3HU"
          api-key="f7b0affeceb55518d7b69414da27f933"
          index-name="resources_search"
          :query="searchQuery">
            <v-list subheader>
            <ais-results>
              <template slot-scope="{ result }">
                <v-list-tile avatar :to="'/resources/'+result.objectID">
                <v-list-tile-avatar>
                  <v-icon>label</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <ais-highlight :result="result" attribute-name="name"></ais-highlight>,&nbsp;
                    <ais-highlight :result="result" attribute-name="shortDesc"></ais-highlight>&nbsp;
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <ais-highlight :result="result" attribute-name="fullDesc"></ais-highlight>
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                    <ais-highlight :result="result" attribute-name="tags"></ais-highlight>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>
              </template>
            </ais-results>
            </v-list>
            <ais-no-results>
              <template slot-scope="props">
                <v-alert type="error" :value="true">
                  No results found.
                </v-alert>
              </template>
            </ais-no-results>
        </ais-index>
      </v-flex>
    </v-layout>
  </v-menu>
</template>

<script>
export default {
  name: 'SearchBox',
  props: [],
  data () {
    return {
      searchQuery: '',
      searchMenuVisibility: false
    }
  }
}
</script>

<style>
.ais-index {background-color:white;}
.ais-index em {background-color:rgb(236, 230, 178);}
</style>
