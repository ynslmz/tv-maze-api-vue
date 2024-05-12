<template>
  <div class="cast">
    <h4 class="title">Cast</h4>
    <ul class="flex flex-wrap flex-justify-start flex-align-start">
      <li v-for="cst in cast" :key="cst.person.id">
        <Person class="artist" :person="cst.person" :character="cst.character" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { Cast } from '@/types/show.type'
import type { PropType } from 'vue'
import Person from '@/components/Person.vue'

defineProps({
  cast: { type: Object as PropType<Cast[]>, required: true }
})
</script>
<style lang="scss" scoped>
.cast {
  background-color: $light;
  border-radius: $s2;
  padding: $s5;
  .title {
    margin-bottom: $s5;
    color: $primary;
  }
  .artist {
    margin: $s3;
  }
}
</style>
