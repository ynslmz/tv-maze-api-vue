<template>
  <div class="episodes">
    <h4>Episodes</h4>
    <ul>
      <li v-for="episode in episodes" :key="episode.id">
        <p>
          <strong>{{ `S${episode.season} - ${episode.number}` }}</strong> - {{ episode.name }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { Episode } from '@/types/show.type'
import type { PropType } from 'vue'

defineProps({
  episodes: {
    type: Object as PropType<Episode[]>,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.episodes {
  background-color: $light;
  border-radius: $s2;
  margin: $s5 0;
  padding: $s5;
  h4 {
    margin-bottom: $s5;
  }
}
</style>
