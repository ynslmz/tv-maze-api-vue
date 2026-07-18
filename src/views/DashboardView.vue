<template>
  <div class="container">
    <div v-if="store.getError" class="state-message" role="alert">
      <p>{{ store.getError }}</p>
      <button type="button" class="retry" @click="reload">Try again</button>
    </div>

    <p v-else-if="isEmpty" class="state-message">No shows to display.</p>

    <template v-else>
      <GenreNav :genres="store.getGenres" :selected="selectedGenre" @select="selectGenre" />
      <GenreCard
        v-for="genre in visibleGenres"
        :key="genre"
        :genre="genre"
        :shows="store.getShowsByGenre(genre)"
      />
      <div class="flex flex-justify-center flex-align-center">
        <Pager :page="store.getPage" :has-next="store.getHasMore" @pageChange="handleClick" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useShowStore } from '@/store/show'
import GenreCard from '@/components/GenreCard.vue'
import GenreNav from '@/components/GenreNav.vue'
import Pager from '@/components/Pager.vue'
const store = useShowStore()

const selectedGenre = ref<string | null>(null)

const isEmpty = computed(() => !store.getLoading && store.getGenres.length === 0)
const visibleGenres = computed(() =>
  selectedGenre.value ? [selectedGenre.value] : store.getGenres
)

function selectGenre(genre: string | null) {
  selectedGenre.value = genre
}

function handleClick(e: number) {
  // A new page has a different genre set, so drop any active filter.
  selectedGenre.value = null
  store.setPage(e)
}

function reload() {
  store.fetchShows(true, store.getPage)
}
</script>

<style lang="scss" scoped>
.state-message {
  text-align: center;
  padding: $s10 $s4;
  color: $primary-dark;
  font-size: $fs4;

  .retry {
    margin-top: $s4;
    background-color: $primary;
    color: $light;
    border: none;
    border-radius: $s2;
    padding: $s3 $s6;
    font-size: $fs3;
    cursor: pointer;

    &:hover {
      background-color: $primary-dark;
    }
  }
}
</style>
