<template>
  <div class="search-list">
    <div v-if="list.length > 0" class="search-results">
      <SearchResultItem :item="result.show" v-for="result in list" :key="result.show.id" />
    </div>
    <p class="no-result-text" v-else>No Results</p>
  </div>
</template>

<script setup lang="ts">
import type { ShowSearchResult } from '@/types/show.type'
import type { PropType } from 'vue'
import SearchResultItem from './SearchResultItem.vue'

defineProps({
  list: {
    type: Object as PropType<ShowSearchResult[]>,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.search-list {
  position: absolute;
  right: $s4;
  left: $s4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: $s3 0;
  border: 1px solid $primary-dark;
  border-radius: 0 0 $s2 $s2;
  background: $light;
  z-index: 100;

  .search-results {
    width: 100%;
  }
  .no-result-text {
    font-weight: 500;
    color: $primary-dark;
    padding: $s10;
  }
}
</style>
