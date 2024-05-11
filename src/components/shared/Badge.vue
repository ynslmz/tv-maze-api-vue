<template>
  <span class="badge">
    <slot></slot>
  </span>
</template>
<style lang="scss" scoped>
.badge {
  font-size: $fs1;
  line-height: 1;
  color: $light;
  padding: $s1;
  border-radius: $s1;
  background-color: $success;
}
</style>
