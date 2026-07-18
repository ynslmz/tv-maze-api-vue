<template>
  <nav class="genre-nav" aria-label="Filter shows by genre">
    <button
      type="button"
      class="genre-chip"
      :class="{ active: selected === null }"
      :aria-pressed="selected === null"
      @click="$emit('select', null)"
    >
      All
    </button>
    <button
      v-for="genre in genres"
      :key="genre"
      type="button"
      class="genre-chip"
      :class="{ active: selected === genre }"
      :aria-pressed="selected === genre"
      @click="$emit('select', genre)"
    >
      {{ genre }}
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  genres: string[]
  selected: string | null
}>()
defineEmits<{
  select: [genre: string | null]
}>()
</script>

<style lang="scss" scoped>
.genre-nav {
  display: flex;
  flex-wrap: wrap;
  gap: $s2;
  padding: $s4 0;

  .genre-chip {
    background-color: $light;
    color: $primary-dark;
    border: 1px solid $primary;
    border-radius: 20px;
    padding: $s1 $s4;
    font-size: $fs2;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: $primary-light;
      color: $light;
    }

    &.active {
      background-color: $primary;
      color: $light;
    }
  }
}
</style>
