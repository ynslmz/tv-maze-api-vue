<template>
  <router-link :to="`/detail/${item.id}`" class="result-item">
    <Image class="result-item-img" :image="item.image" :alt="item.name" />
    <div class="result-item-details flex-grow">
      <p class="result-item-details-title">{{ item.name }}</p>
      <Badge v-if="averageText">{{ averageText }} </Badge>
    </div>
    <span class="result-item-detail"></span>
  </router-link>
</template>

<script setup lang="ts">
import type { Show } from '@/types/show.type'
import { computed } from 'vue'
import Badge from '@/components/shared/Badge.vue'
import Image from '@/components/shared/Image.vue'
import { formatRating } from '@/utils/formatRating'

const props = defineProps<{ item: Show }>()

const averageText = computed(() => formatRating(props.item.rating?.average))
</script>
<style lang="scss" scoped>
.result-item {
  display: flex;
  color: $primary-dark;
  padding: $s1;
  text-decoration: none;

  &-img {
    max-height: 80px;
    min-height: 60px;
    min-width: 60px;
    max-width: 10%;
    object-fit: cover;
  }

  &-details {
    padding: $s1;
    overflow: hidden;

    &-title {
      text-align: left;
      font-weight: 500;
      flex-grow: 1;
      font-size: $fs3;
      margin-bottom: $s2;
    }
  }

  &-detail {
    border: $s2 solid transparent;
    border-left: $s4 solid $primary;
    align-self: center;
    margin-right: $s5;
  }

  &:nth-child(even) {
    background-color: $gray;
  }

  &:nth-child(odd) {
    background-color: $light;
  }
}
</style>
