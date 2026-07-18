<template>
  <img :src="source" :alt="alt" :style="style" />
</template>
<script setup lang="ts">
import type { Image } from '@/types/show.type'
import { noImageUrl } from '@/utils/constValues'
import { computed, type StyleValue } from 'vue'

const props = withDefaults(
  defineProps<{
    image?: Image
    alt: string
    size?: 'medium' | 'original'
    style?: StyleValue
  }>(),
  { size: 'medium' }
)
const source = computed(() => props.image?.[props.size] ?? noImageUrl)
</script>
