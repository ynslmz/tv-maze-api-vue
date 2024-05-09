<template>
  <div>Home Page</div>
  {{ response }}
</template>

<script setup lang="ts">
import { ShowService } from '@/api/showService'
import { ref } from 'vue'

const response = ref<any>(null)

ShowService.getShows().then((res) => (response.value = res))
</script>
