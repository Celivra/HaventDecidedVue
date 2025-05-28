<template>
  <header>
    <h1>主页</h1>
  </header>

  <nav>
    <div class="nav-left">
      <a href="#">主页</a>
      <a href="#">关于我</a>
      <a href="#">项目</a>
      <a href="#">联系我</a>
    </div>
    <div class="nav-right">
      <a href="/login">登入</a>
      <a href="/dashboard">控制台</a>
    </div>
  </nav>

  <main>
    <h2>标题</h2>
    <p>文本内容</p>
  </main>

  <footer>
    底部
  </footer>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

  const route = useRoute()
  onMounted(()=>{
    if(route.query.message){
      alert(route.query.message);
    }
  })
</script>
<style>
      body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    header {
      background-color: #333;
      color: white;
      padding: 1rem;
      text-align: center;
    }

    nav {
      background-color: #444;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-left a,
    .nav-right a {
      color: white;
      margin: 0 0.5rem;
      text-decoration: none;
    }

    .nav-right a {
      background-color: #666;
      padding: 5px 10px;
      border-radius: 5px;
    }

    .nav-right a:hover {
      background-color: #888;
    }

    main {
      padding: 2rem;
    }

    footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 1rem;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
</style>