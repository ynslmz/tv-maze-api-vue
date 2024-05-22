<template>
  <div class="show-info">
    <Image class="show-info-image" :image="show.image" :alt="show.name" />
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
import { computed } from 'vue'
const store = useShowStore()
const show = computed(() => store.getShowDetail)
</script>

<style lang="scss" scoped>
.show-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: $light;
  padding: $s5;
  margin: $s5 0;

  &-image {
    width: 210px;
    height: 295px;
  }

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

  @media (max-width: 768px) {
    flex-direction: column;

    &-image {
      width: 100%;
      height: auto;
    }

    &-col {
      width: 100%;
      margin: $s3 0;
      border-left: none;
      padding-left: 0;
    }

    &-table {
      width: 100%;
    }
  }
}
</style>
