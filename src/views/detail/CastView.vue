<template>
  <Cast v-if="cast" :cast="cast" />
</template>
<script setup lang="ts">
import Cast from '@/components/Cast.vue'
import { useShowStore } from '@/store/show'
import { computed } from 'vue';
const store = useShowStore()
const cast = computed(() => store.getShowDetail?._embedded.cast)
</script>
<style lang="scss" scoped></style>
