<template>
  <header>
    <div class="wrapper">
      <div class="container header-bar">
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

  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    width: 100%;
    .logo-link {
      color: $light;
      text-decoration: none;
      letter-spacing: $s1;
    }
  }

  @media screen and (max-width: 768px) {
    padding: $s2 0;

    .header-bar {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    h1 {
      margin-bottom: $s3;
    }
  }
}
</style>
