<template>
  <Header></Header>

  <main class="wrapper">
    <router-view />
  </main>
</template>
<script setup lang="ts">
import Header from './components/layout/Header.vue'
</script>

<style scoped></style>
