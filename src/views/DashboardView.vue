<template>
  <div class="genre-list">
    <GenreCard
      v-for="genre in store.getGenres"
      :key="genre"
      :genre="genre"
      :shows="store.getShowsByGenre(genre)"
    />
  </div>
</template>

<script setup lang="ts">
import { useShowStore } from '@/store/show'
import GenreCard from '@/components/GenreCard.vue'
const store = useShowStore()
</script>
<style lang="scss" scoped>
.genre-list {
  margin: $s5 0;
}
</style>
