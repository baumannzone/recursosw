<template>
  <v-card>
    <v-layout row wrap>
      <!--<v-flex xs12>-->
        <!--<h2>{{ data.name }}</h2>-->
      <!--</v-flex>-->
      <!--<v-flex md3>-->
        <!--<img :src="data.media.mainImg" height="150px"/>-->
      <!--</v-flex>-->
      <!--<v-flex md9>-->
        <!--<div>-->
          <!--<div class="headline"> {{ data.title }}</div>-->
          <!--<div>{{ data.shortDesc }}</div>-->
        <!--</div>-->
      <!--</v-flex>-->
      <div class="resource">
        <div class="resource-img">
          <img :src="data.media.mainImg" height="150px"/>
        </div>
        <div class="resource-content">
          <div class="headline"> {{ data.title }}</div>
          <div>{{ data.shortDesc }}</div>
        </div>
      </div>
    </v-layout>
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
  }
}
</script>
