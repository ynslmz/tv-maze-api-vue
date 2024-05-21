<template>
  <div class="pager">
    <button
      v-if="page !== 1"
      class="pager-item"
      type="button"
      @click="$emit('pageChange', 1)"
    >
      First
    </button>
    <button
      class="pager-item"
      type="button"
      @click="$emit('pageChange', page - 1)"
      :disabled="page === 1"
    >
      Previous
    </button>
    <span class="pager-item active-page">{{ page }}</span>
    <button class="pager-item" type="button" @click="$emit('pageChange', page + 1)">Next</button>
  </div>
</template>
<script setup lang="ts">
const $emit = defineEmits(['pageChange'])
defineProps({
  page: { type: Number, required: true }
})
</script>
<style lang="scss" scoped>
.pager {
  display: flex;
  justify-content: center;
  margin: $s10;
  border-radius: $s2;
  overflow: hidden;

  &-item {
    background-color: $primary;
    color: $light;
    font-size: $fs3;
    font-weight: 500;
    padding: $s4;
    border: none;
    border-right: 1px solid $light;
    &:last-child {
      border-right: none;
    }

    &:disabled {
      cursor: not-allowed;
      color: #ccc;
    }
    
    &.active-page {
      background-color: $light;
      color: $primary;
    }
  }
}
</style>
