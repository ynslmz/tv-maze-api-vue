<template>
  <div class="genre">
    <h3 class="genre-title">{{ genre }}</h3>
    <div class="shows-list flex flex-justify-start">
      <ShowCard v-for="show in shows" :key="genre + show.id" :show="show" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Show } from '@/types/show.type'
import type { PropType } from 'vue'
import ShowCard from '@/components/ShowCard.vue'

defineProps({
  genre: { type: String, required: true },
  shows: { type: Object as PropType<Show[]>, required: true }
})
</script>
<style lang="scss" scoped>
.genre {
  margin: $s5 0;
  border-radius: $s2;
  padding: $s5 $s3;
  background-color: $light;
  box-shadow: 0 2px 4px rgba(41, 40, 40, 0.2);

  &-title {
    margin: $s1 0;
    color: $primary;
  }
  .shows-list {
    overflow: auto hidden;
  }

  @media (max-width: 768px) {
    &-title {
      font-size: $fs4;
    }
  }
}
</style>
