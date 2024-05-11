<template>
  <header>
    <div class="wrapper">
      <div class="container flex flex-justify-between">
        <h1>
          <router-link to="/" class="logo-link">TV MAZE</router-link>
        </h1>

        <SearchBar />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import SearchBar from './SearchBar.vue'
</script>

<style lang="scss" scoped>
header {
  padding: $s3 0;
  background: $primary-gradient;

  h1 {
    width: 100%;
    .logo-link {
      color: $light;
      text-decoration: none;
      letter-spacing: $s1;
    }
  }
}
</style>
