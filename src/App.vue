<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: 'Microsoft YaHei', sans-serif;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>