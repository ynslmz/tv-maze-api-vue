<template>
  <img :src="source" :alt="alt" :style="style" />
</template>
<script setup lang="ts">
import type { Image } from '@/types/show.type'
import { noImageUrl } from '@/utils/constValues'
import type { PropType } from 'vue'
import { computed } from 'vue'

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
const imageUrl = computed(() => ({ ...(props.image ?? {}) })[props.size])
const source = computed(() => imageUrl.value ?? noImageUrl)
</script>
