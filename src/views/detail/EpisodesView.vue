<template>
  <EpisodeList v-if="episodes" :episodes="episodes" />
</template>
<script setup lang="ts">
import { useShowStore } from '@/store/show'
import EpisodeList from '@/components/EpisodeList.vue'
import { computed } from 'vue';
const episodes = computed(() => useShowStore().getShowDetail?._embedded.episodes)
</script>
