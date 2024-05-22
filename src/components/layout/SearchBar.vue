<template>
  <div class="search-bar">
    <div class="input-group">
      <SearchIcon class="icon" />
      <input
        class="input-search"
        type="text"
        placeholder="Search"
        v-model="searchText"
        @input="onSearch"
      />
    </div>
    <SearchResults
      v-show="store.getSearchResults.length > 0 || searchText?.length > 0"
      :list="store.getSearchResults"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue'
import SearchResults from '@/components/layout/SearchResults.vue'

import { debounce } from '@/utils/debounce'
import { useShowStore } from '@/store/show'
import { useRouter } from 'vue-router'

const store = useShowStore()
const searchText = defineModel<string>({ default: '' })
const router = useRouter()

function onSearch() {
  if (!searchText.value) {
    return
  }
  debounce(() => {
    store.searchShows(searchText.value!)
  }, 300)
}

async function handleClick(e: Event) {
  const link = (e.target as any).closest('.result-item')
  if (link) {
    const id = link.getAttribute('name')
    if (id) {
      await store.fetchShowById(id)
      router.push(`/detail/${id}`)
      searchText.value = ''
      store.clearSearchResults()
    }
  }
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
