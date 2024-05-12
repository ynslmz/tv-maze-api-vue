<template>
  <img :src="source" :alt="alt" :style="style" />
</template>
<script setup lang="ts">
import type { Image } from '@/types/show.type'
import type { PropType } from 'vue'

const props = defineProps({
  image: {
    type: Object as PropType<Image>
  },
  alt: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => ['medium', 'original'].includes(value)
  },
  style: Object
})

const source = { ...props.image }[props.size] || 'https://via.placeholder.com/210x295?text=No image'
</script>
