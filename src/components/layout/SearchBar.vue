<template>
  <div class="search-bar">
    <div class="input-group">
      <SearchIcon class="icon" />
      <input
        class="input-search"
        type="text"
        placeholder="Search"
        role="combobox"
        aria-label="Search shows"
        aria-autocomplete="list"
        aria-controls="search-listbox"
        :aria-expanded="showDropdown"
        :aria-activedescendant="activeDescendant"
        v-model="searchText"
        @input="onSearch"
        @keydown="onKeydown"
      />
    </div>
    <SearchResults
      v-show="showDropdown"
      :list="store.searchResults"
      :error="store.searchError"
      :active-index="activeIndex"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import SearchResults from '@/components/layout/SearchResults.vue'

import { createDebounce } from '@/utils/debounce'
import { useShowStore } from '@/store/show'

const store = useShowStore()
const router = useRouter()
const searchText = defineModel<string>({ default: '' })
const activeIndex = ref(-1)

const showDropdown = computed(
  () => store.searchResults.length > 0 || (searchText.value?.length ?? 0) > 0
)
const activeDescendant = computed(() => {
  const active = store.searchResults[activeIndex.value]
  return active ? `search-option-${active.show.id}` : undefined
})

const debouncedSearch = createDebounce((query: string) => store.searchShows(query), 300)

function onSearch() {
  activeIndex.value = -1
  if (!searchText.value) {
    debouncedSearch.cancel()
    store.clearSearchResults()
    return
  }
  debouncedSearch(searchText.value)
}

function onKeydown(event: KeyboardEvent) {
  const results = store.searchResults
  switch (event.key) {
    case 'ArrowDown':
      if (results.length) {
        event.preventDefault()
        activeIndex.value = (activeIndex.value + 1) % results.length
      }
      break
    case 'ArrowUp':
      if (results.length) {
        event.preventDefault()
        activeIndex.value = activeIndex.value <= 0 ? results.length - 1 : activeIndex.value - 1
      }
      break
    case 'Enter': {
      const active = results[activeIndex.value]
      if (active) {
        event.preventDefault()
        router.push(`/detail/${active.show.id}`)
        reset()
      }
      break
    }
    case 'Escape':
      reset()
      break
  }
}

function reset() {
  searchText.value = ''
  activeIndex.value = -1
  debouncedSearch.cancel()
  store.clearSearchResults()
}

function handleClick() {
  reset()
}
</script>
<style lang="scss" scoped>
.search-bar {
  position: relative;
  width: 100%;

  .input-group {
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    height: 40px;
    width: 100%;
    position: relative;

    .input-search {
      flex-grow: 1;
      width: 75%;
      border-radius: 20px;
      border: none;
      padding: $s1 $s4 $s1 $s8;
    }

    .icon {
      position: absolute;
      top: $s2;
      left: $s2;
      height: 22px;
      width: 22px;
    }
  }
}
</style>
