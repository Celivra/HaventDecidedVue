<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/HeaderComp.vue'
import Footer from './components/FooterComp.vue'
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