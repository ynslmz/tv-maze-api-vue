<template>
  <header>
    <div class="wrapper">
      <div class="container flex flex-justify-between">
        <h1>
          <router-link to="/" class="logo-link">TV MAZE</router-link>
        </h1>
        <div>
          <input type="text" name="" id="" placeholder="search" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  padding: $s7 0;
  background: $primary-gradient;
  color: $dark;

  .logo-link {
    color: $light;
    text-decoration: none;
    letter-spacing: $s1;
  }
}
</style>
