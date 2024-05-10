<template>
  <div class="show-list">
    <div class="genre" v-for="genre in store.getGenres" :key="genre">
      <h3 class="genre-title">{{ genre }}</h3>
      <div class="genre-shows-list flex flex-justify-start">
        <div
          class="show-item flex flex-dir-col flex-justify-start flex-align-start"
          v-for="show in store.getShowsByGenre(genre)"
          :key="genre + show.id"
        >
          <div class="show-item-image">
            <img :src="show.image.medium" :alt="show.name" />
          </div>
          <h6 class="show-item-title">{{ show.name }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShowStore } from '@/store/show'
const store = useShowStore()
</script>

<style lang="scss" scoped>
.show-list {
  .genre {
    margin-bottom: $s2;
    .genre-title {
      margin-bottom: $s2;
    }
    .genre-shows-list {
      overflow: auto hidden;
      .show-item {
        margin: $s2;
        width: 200px;
        height: 350px;
        .show-item-image {
          img {
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
