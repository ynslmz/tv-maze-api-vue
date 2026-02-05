<template>
  <Header></Header>

  <main class="wrapper">
    <div v-if="error" class="error-banner">
      <span>{{ error }}</span>
      <button @click="clearError" class="close-btn">&times;</button>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <Loading v-if="isLoading" />
  </main>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useShowStore } from './store/show'
import Header from './components/layout/Header.vue'
import Loading from './components/layout/Loading.vue'

const store = useShowStore()
const route = useRoute()

const isLoading = computed(() => store.isLoading)
const error = computed(() => store.error)

function clearError() {
  store.error = null
}

// Clear error on route change
watch(
  () => route.path,
  () => {
    if (error.value) {
      clearError()
    }
  }
)
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

.error-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: $danger;
  color: white;
  margin-bottom: 1rem;
  border-radius: $s2;

  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
</style>
