<template>
  <header>Tv Maze</header>
  <nav>
    <router-link to="/">Dashboard</router-link> |
    <router-link to="/detail/1">Detail</router-link>
  </nav>

  <main>
    <router-view />
  </main>
</template>

<style scoped></style>
