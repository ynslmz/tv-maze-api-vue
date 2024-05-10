<template>
  <Header></Header>

  <main class="wrapper">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <Loading v-if="isLoading" />
  </main>
</template>
<script setup lang="ts">
import Header from './components/layout/Header.vue'
import Loading from './components/layout/Loading.vue'
import { useLoading } from './composables/useLoading'
const { isLoading } = useLoading()
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
