<template>
  <div class="person flex flex-wrap">
    <Image class="person-image" :image="person.image" :alt="person.name" />
    <div class="person-info">
      <p class="name">{{ person.name }}</p>
      <p class="character">as {{ character.name }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Character, Person } from '@/types/show.type'
import type { PropType } from 'vue'
import Image from '@/components/shared/Image.vue'

defineProps({
  person: {
    type: Object as PropType<Person>,
    required: true
  },
  character: {
    type: Object as PropType<Character>,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.person {
  $width: 210px;
  $height: 295px;

  border-radius: $s2;
  overflow: hidden;
  position: relative;
  padding-bottom: $s6;

  &-image {
    width: $width;
    height: $height;
  }

  &-info {
    position: absolute;
    bottom: $s3 * -1;
    right: 0;
    left: 0;
    background: $primary-dark;
    padding: $s4 $s2;
    width: calc($width - $s4);
    font-family: $text-font;
    .name {
      font-size: $fs4;
      font-size: 400;
      color: $secondary-light;
    }
    .character {
      font-size: $fs2;
      color: $light;
      margin: $s2 0;
    }
  }

  @media (max-width: 768px) {
    &-image {
      width: calc($width / 1.5);
      height: calc($height / 1.5);
    }

    &-info {
      padding: $s3 $s2;
      .name {
        font-size: $fs2;
      }
      .character {
        font-size: $fs1;
      }
    }
  }
}
</style>
