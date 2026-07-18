<template>
  <router-link
    :title="`Details of ${show.name}`"
    class="show-item flex flex-dir-col flex-justify-start flex-align-start"
    :to="`/detail/${show.id}`"
  >
    <div class="show-item-image" :style="imageInStyle">
      <Badge class="rating-badge" v-if="averageText">{{ averageText }}</Badge>

      <h5 class="show-item-title">
        {{ show.name }}
      </h5>
    </div>
    <div class="show-item-info">
      <div class="summary" v-html="safeSummary" />
      <button class="btn-detail" type="button" :title="`Details of ${show.name}`">Detail</button>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Show } from '@/types/show.type'
import { computed } from 'vue'
import Badge from './shared/Badge.vue'
import { formatRating } from '@/utils/formatRating'
import { sanitizeHtml } from '@/utils/sanitizeHtml'
import { noImageUrl } from '@/utils/constValues'

const props = defineProps<{ show: Show }>()

const averageText = computed(() => formatRating(props.show.rating?.average))
const safeSummary = computed(() => sanitizeHtml(props.show.summary))
const imageInStyle = computed(() => {
  const imageUrl = props.show.image?.medium || noImageUrl
  return `background: center / 100% 100%   no-repeat  url("${imageUrl}")`
})
</script>

<style lang="scss" scoped>
$card-width: 210px;
$img-height: 295px;

.show-item {
  text-decoration: none;
  margin: $s2;
  width: $card-width;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &-image {
    position: relative;
    height: $img-height;
    width: $card-width;
    border-radius: $s2;
    .rating-badge {
      position: absolute;
      top: $s1;
      left: $s1;
    }
  }

  &-title {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: $s3;
    font-family: $title-font;
    font-size: $fs3;
    font-weight: 500;
    letter-spacing: 0.5px;
    border-radius: 0 0 $s2 $s2;
    fill: transparent;
    background: $primary-dark;
    color: $light;
    width: calc(100% - $s6);
  }

  &-info {
    .summary {
      padding: $s2 0;
      font-size: $fs2;
      font-family: $text-font;
      color: $dark;
      line-height: 1.2;
      height: 60px;
      margin-bottom: $s2;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }

    .btn-detail {
      padding: $s2;
      font-family: $text-font;
      font-weight: 600;
      text-transform: capitalize;
      letter-spacing: 0.8px;
      background-color: $secondary;
      border-color: $secondary;
      color: $primary-dark;
      border-radius: $s1;
      width: 100%;
    }
  }

  @media screen and (max-width: $mobile) {
    width: calc($card-width / 1.5);
    &-image {
      height: calc($img-height/1.5);
      width: calc($card-width/1.5);
    }

    &-title {
      font-size: $fs2;
    }
  }
}
</style>
