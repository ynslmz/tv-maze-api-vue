<template>
  <div class="show-info flex flex-justify-between">
    <Image :image="show.image" :alt="show.name" :style="{ width: '200px', height: '295px' }" />
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

  <Cast :cast="show._embedded.cast" />

  <EpisodeList :episodes="show._embedded.episodes" />
</template>

<script setup lang="ts">
import { useShowStore } from '@/store/show'
import EpisodeList from '@/components/EpisodeList.vue'
import Cast from '@/components/Cast.vue'
import Image from '@/components/shared/Image.vue'
const store = useShowStore()
const show = store.show
</script>

<style lang="scss" scoped>
.show-info {
  background-color: $light;
  padding: $s5;
  margin: $s5 0;
  &-col {
    width: calc((100% - 200px - $s6) / 2);
    margin-left: $s3;
    border-left: 1px solid $primary-dark;
    padding-left: $s3;

    &:first {
      margin-left: 0;
      border-left: none;
      padding-left: 0;
    }
  }

  &-summary {
    flex-shrink: 1;
  }

  &-table {
    width: 40%;
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
