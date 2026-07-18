<template>
  <div class="search-list">
    <p class="no-result-text" v-if="error" role="alert">Something went wrong. Please try again.</p>
    <div v-else-if="list.length > 0" class="search-results" id="search-listbox" role="listbox">
      <SearchResultItem
        v-for="(result, index) in list"
        :key="result.show.id"
        :item="result.show"
        :id="`search-option-${result.show.id}`"
        role="option"
        :aria-selected="index === activeIndex"
        :class="{ active: index === activeIndex }"
      />
    </div>
    <p class="no-result-text" v-else>No Results</p>
  </div>
</template>

<script setup lang="ts">
import type { ShowSearchResult } from '@/types/show.type'
import SearchResultItem from './SearchResultItem.vue'

withDefaults(
  defineProps<{
    list: ShowSearchResult[]
    error?: boolean
    activeIndex?: number
  }>(),
  { error: false, activeIndex: -1 }
)
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

    .active {
      outline: 2px solid $primary;
      outline-offset: -2px;
    }
  }

  .no-result-text {
    font-weight: 500;
    color: $primary-dark;
    padding: $s10;
  }
}
</style>
