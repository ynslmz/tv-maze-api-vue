<template>
  <div class="container">
    <div class="bread-crumb">
      <router-link to="/"> Dashboard > Shows </router-link> >
      <router-link :to="showUrl"> {{ show?.name }}</router-link>
    </div>

    <h4 class="title">{{ show?.name }}</h4>

    <ul class="detail-menu flex flex-justify-start flex-align-start">
      <li><router-link exact-active-class="active" :to="showUrl"> Main</router-link></li>
      <li><router-link exact-active-class="active" :to="`${showUrl}/cast`"> Cast</router-link></li>
      <li>
        <router-link exact-active-class="active" :to="`${showUrl}/episodes`"> Episodes</router-link>
      </li>
    </ul>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useShowStore } from '@/store/show'
const store = useShowStore()
const show = store.show
const showUrl = `/detail/${show?.id}`
</script>

<style lang="scss">
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

  li {
    display: flex;
    padding: 0 $s4;
    a {
      padding: $s4;
      color: $primary;
      text-decoration: none;
      &:hover,
      &.active {
        background-color: $primary;
        color: $light;
      }
    }
  }
}
</style>
