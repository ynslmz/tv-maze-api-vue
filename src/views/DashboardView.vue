<template>
  <div class="container">
    <GenreCard
      v-for="genre in store.getGenres"
      :key="genre"
      :genre="genre"
      :shows="store.getShowsByGenre(genre)"
    />
    <div class="flex flex-justify-center flex-align-center">
      <Pager :page="store.getPage" @pageChange="handleClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShowStore } from '@/store/show'
import GenreCard from '@/components/GenreCard.vue'
import Pager from '@/components/Pager.vue'
const store = useShowStore()

function handleClick(e) {
  store.setPage(e)
}
</script>
