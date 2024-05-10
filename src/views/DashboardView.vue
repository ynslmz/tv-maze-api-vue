<template>
  <div>Home Page</div>
  {{ store.getGenres }}
  <br />
  <br />
  {{ store.getShows }}
</template>

<script setup lang="ts">
import { useShowStore } from '@/store/show'
const store = useShowStore()
</script>
