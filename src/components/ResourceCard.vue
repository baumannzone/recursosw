<template>
  <v-card class="elevation-0">
    <div class="resource pa-2 mb-2">
      <div class="resource-img">
        <img :src="data.media.mainImg" width="85px"/>
      </div>
      <div class="resource-content pl-3">
        <div class="top">
          <div class="title"> {{ data.name }}</div>
          <div>{{ data.shortDesc }}</div>
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
              {{ tag }}</v-chip>
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

</style>
