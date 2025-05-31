<template>
  <header class="header">
    <div class="top-bar">
      <div class="container">
        <div class="left">
          <span>欢迎来到京东商城</span>
        </div>
        <div class="right">
          <a href="#">登录</a>
          <a href="#">注册</a>
          <a href="#">我的订单</a>
          <a href="#">会员中心</a>
          <a href="#">客户服务</a>
        </div>
      </div>
    </div>
    
    <div class="main-header">
      <div class="container">
        <div class="logo">
          <router-link to="/">京东商城</router-link>
        </div>
        <div class="search">
          <input type="text" placeholder="搜索商品">
          <button>搜索</button>
        </div>
        <div class="cart">
          <router-link to="/cart">购物车({{ cartCount }})</router-link>
        </div>
      </div>
    </div>
    
    <nav class="main-nav">
      <div class="container">
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/category/1">手机数码</router-link></li>
          <li><router-link to="/category/2">电脑办公</router-link></li>
          <li><router-link to="/category/3">家用电器</router-link></li>
          <li><router-link to="/category/4">食品生鲜</router-link></li>
          <li><router-link to="/category/5">美妆护肤</router-link></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const cartCount = ref(0)
</script>

<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.top-bar {
  background: #f2f2f2;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.main-header {
  display: flex;
  align-items: center;
  height: 80px;
}
.logo a {
  font-size: 24px;
  font-weight: bold;
  color: #e4393c;
  text-decoration: none;
}
.search {
  display: flex;
  width: 500px;
}
.search input {
  flex: 1;
  height: 36px;
  border: 2px solid #e4393c;
  padding: 0 10px;
}
.search button {
  width: 80px;
  background: #e4393c;
  color: white;
  border: none;
  cursor: pointer;
}
.cart a {
  color: #e4393c;
  text-decoration: none;
}
.main-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.main-nav li {
  padding: 15px 20px;
}
.main-nav a {
  color: #333;
  text-decoration: none;
}
.main-nav a:hover {
  color: #e4393c;
}
</style>