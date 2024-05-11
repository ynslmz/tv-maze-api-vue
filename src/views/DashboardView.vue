<template>
  <div class="container">
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
