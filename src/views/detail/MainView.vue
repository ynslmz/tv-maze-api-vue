<template>
  <div class="show-info flex flex-justify-between">
    <img class="show-info-col show-info-image" :src="show.image.medium" :alt="show.name" />
    <p class="show-info-col show-info-summary" v-html="show.summary" />
    <div class="show-info-col show-info-table">
      <p class="info"><strong>Rating:</strong> {{ show.rating.average }}</p>
      <p class="info"><strong>Status:</strong> {{ show.status }}</p>
      <p class="info"><strong>Language:</strong> {{ show.language }}</p>
      <p class="info"><strong>Genres:</strong> {{ show.genres.join(', ') }}</p>
      <p class="info"><strong>Runtime:</strong> {{ show.runtime }} minutes</p>
      <p class="info"><strong>Premiered:</strong> {{ show.premiered }}</p>
      <p class="info"><strong>Ended:</strong> {{ show.ended }}</p>
    </div>
  </div>

  <div class="cast">
    <h4>Cast</h4>
    <ul class="flex flex-wrap flex-justify-between">
      <li v-for="cast in show._embedded.cast" :key="cast.person.id">
        <div class="card">
          <img :src="cast.person.image.medium" :alt="cast.person.name" />
          <p>{{ cast.person.name }}</p>
        </div>
      </li>
    </ul>
  </div>

  <div class="episodes">
    <h4>Episodes</h4>
    <ul class="flex flex-wrap flex-justify-between">
      <li v-for="episode in show._embedded.episodes" :key="episode.id">
        <div class="card">
          <img :src="episode.image.medium" :alt="episode.name" />
          <p>{{ episode.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useShowStore } from '@/store/show'
const store = useShowStore()
const show = store.show
</script>

<style lang="scss" scoped>
.show-info {
  margin: $s5 0;
  &-col {
    margin: 0 $s3;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  &-summary {
    flex-shrink: 1;
  }

  &-table {
    width: 40%;
    border-radius: $s1;
    .info {
      margin-bottom: $s3;
    }
  }
}

.card {
  width: 200px;
  margin: $s5;
}
</style>
