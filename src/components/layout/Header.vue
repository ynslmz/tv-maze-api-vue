<template>
  <header>
    <div class="wrapper flex">
      <h1>
        <router-link to="/" class="logo-link">TV MAZE</router-link>
      </h1>
      <div>
        <input type="text" name="" id="" placeholder="search" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  padding: $s7;
  background: $primary-gradient;
  color: map-get($colors, 'dark');

  .logo-link {
    color: white;
    text-decoration: none;
    letter-spacing: $s1;
  }
}
</style>
