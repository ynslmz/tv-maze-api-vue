<template>
  <EpisodeList :episodes="episodes" />
</template>
<script setup lang="ts">
import { useShowStore } from '@/store/show'
import EpisodeList from '@/components/EpisodeList.vue'
const episodes = useShowStore().getShowDetail._embedded.episodes
</script>
<style lang="scss" scoped></style>
