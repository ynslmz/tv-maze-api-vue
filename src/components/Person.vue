<template>
  <div class="person flex flex-wrap">
    <Image :image="person.image" :alt="person.name" />
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
  border-radius: $s2;
  overflow: hidden;
  position: relative;
  padding-bottom: $s6;
  &-info {
    position: absolute;
    bottom: $s3 * -1;
    background: $primary-dark;
    padding: $s4 $s2;
    width: 100%;
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
}
</style>
