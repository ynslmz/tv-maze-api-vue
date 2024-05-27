<template>
  <div class="container">
    <div class="bread-crumb">
      <router-link to="/"> Shows </router-link> >
      <router-link :to="showUrl"> {{ show?.name }}</router-link>
    </div>

    <h4 class="title">{{ viewName + ' of ' + show?.name }}</h4>

    <ul class="detail-menu flex flex-justify-start flex-align-start">
      <li><router-link exact-active-class="active" :to="showUrl"> Main</router-link></li>
      <li><router-link exact-active-class="active" :to="`${showUrl}/cast`"> Cast</router-link></li>
      <li>
        <router-link exact-active-class="active" :to="`${showUrl}/episodes`"> Episodes</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { useShowStore } from '@/store/show'
import { computed, onBeforeMount } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
const store = useShowStore()
const show = computed(() => store.getShowDetail)
const viewName = computed(() => ` ${useRouter().currentRoute.value.name?.toString()}`)
const showUrl = computed(() => `/detail/${show.value?.id}`)
const route = useRoute()

onBeforeMount(() => {
  store.fetchShowById(route.params.id.toString())
})

onBeforeRouteUpdate((to) => {
  store.fetchShowById(to.params.id.toString())
})
</script>

<style lang="scss" scoped>
.bread-crumb {
  padding: $s4 $s1;
  font-size: $fs3;
  border-bottom: 1px solid $primary-dark;
  color: $primary-dark;

  a {
    color: $primary-dark;
    text-decoration: none;
  }
}

.title {
  margin: $s4 $s1;
  font-family: $title-font;
  letter-spacing: 2px;
  font-size: $fs10;
  font-weight: 500;
  color: $primary;
}

.detail-menu {
  background-color: $light;
  border-radius: $s2;
  margin: $s4 0;
  overflow: hidden;

  li {
    display: flex;

    a {
      padding: $s4;
      color: $primary;
      text-decoration: none;
      min-width: 60px;
      text-align: center;

      &:hover,
      &.active {
        background-color: $primary;
        color: $light;
      }
    }
  }
}
</style>
