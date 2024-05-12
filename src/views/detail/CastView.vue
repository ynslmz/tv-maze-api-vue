<template>
  <div>
    <Cast :cast="store.getShowDetail._embedded.cast" />
  </div>
</template>
<script setup lang="ts">
import Cast from '@/components/Cast.vue'
import { useShowStore } from '@/store/show'
const store = useShowStore()
</script>
<style lang="scss" scoped></style>
