<template>
  <a class="item flex" :name="item.id">
    <Image class="item-img" :image="item.image" :alt="item.name" style="" />
    <div class="item-details flex-grow">
      <p class="item-details-title">{{ item.name }}</p>
      <Badge v-if="avarageText">{{ avarageText }} </Badge>
    </div>
    <button class="item-btn-detail">></button>
  </a>
</template>

<script setup lang="ts">
import type { Show } from '@/types/show.type'
import type { PropType } from 'vue'
import Badge from '@/components/shared/Badge.vue'
import Image from '@/components/shared/Image.vue'

const props = defineProps({
  item: {
    type: Object as PropType<Show>,
    required: true
  }
})

const avarageText = props.item.rating.average ? `${props.item.rating.average.toFixed(1)} ⭐️` : ''
</script>
<style lang="scss" scoped>
.item {
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

  &-btn-detail {
    background-color: $primary;
    color: $light;
    border: none;
    cursor: pointer;
    align-self: center;
    vertical-align: middle;
    line-height: 1;
    font-weight: 900;
    height: $s8;
    width: $s8;
    border-radius: 50%;
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
