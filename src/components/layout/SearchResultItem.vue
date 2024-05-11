<template>
  <a class="search-result-item flex" :name="item.id">
    <img class="img" :src="imageUrl" :alt="item.name" />
    <div class="details flex-grow">
      <p class="title">{{ item.name }}</p>
      <Badge v-if="item.rating.average">{{ avarageText }} </Badge>
    </div>
    <button class="btn-detail">></button>
  </a>
</template>

<script setup lang="ts">
import type { Show } from '@/types/show.type'
import type { PropType } from 'vue'
import Badge from '@/components/shared/Badge.vue'

const props = defineProps({
  item: {
    type: Object as PropType<Show>,
    required: true
  }
})
const imageUrl = props.item.image?.medium || 'https://via.placeholder.com/210x295?text=No image'

const avarageText = props.item.rating.average ? `${props.item.rating.average.toFixed(1)} ⭐️` : ''
</script>
<style lang="scss" scoped>
.search-result-item {
  color: $primary-dark;
  padding: $s1;
  text-decoration: none;

  .img {
    max-height: 80px;
    min-height: 60px;
    min-width: 60px;
    max-width: 10%;
    object-fit: cover;
  }

  .title {
    text-align: left;
    font-weight: 500;
    flex-grow: 1;
    font-size: $fs2;
    margin-bottom: $s2;
  }

  .details {
    padding: $s1;
    overflow: hidden;
  }

  .btn-detail {
    background-color: $primary;
    color: $light;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    height: 36px;
    width: 36px;
    border-radius: 50%;
  }

  &:nth-last-child(1) {
    margin-bottom: 0;
  }

  &:nth-child(even) {
    background-color: $gray;
  }

  &:nth-child(odd) {
    background-color: $light;
  }
}
</style>
