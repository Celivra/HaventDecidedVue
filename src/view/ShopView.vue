<template>
  <HeaderComp />
  <div class="shop-page">
    <!-- Navbar -->
    <header class="navbar">
      <h1 class="shop-title">购物平台</h1>
      <router-link to="/cart" class="cart-icon-wrapper">
        <ShoppingCartIcon class="cart-icon" />
        <span v-if="cart.length" class="cart-badge">
          {{ cart.length }}
        </span>
      </router-link>
    </header>

    <!-- Product Grid -->
    <main class="product-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="product-image"
        />
        <h2 class="product-title">{{ product.title }}</h2>
        <p class="product-price">￥{{ product.price }}</p>
        <button @click="addToCart(product)" class="add-button">
          加入购物车
        </button>
      </div>
    </main>
  </div>
  <FooterComp />
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingCartIcon } from 'lucide-vue-next'
import HeaderComp from '@/components/HeaderComp.vue'
import FooterComp from '@/components/FooterComp.vue'

const products = ref([
  {
    id: 1,
    title: '无线耳机',
    price: 199,
    image: 'https://via.placeholder.com/300x200?text=无线耳机',
  },
  {
    id: 2,
    title: '智能手表',
    price: 499,
    image: 'https://via.placeholder.com/300x200?text=智能手表',
  },
  {
    id: 3,
    title: '蓝牙音箱',
    price: 299,
    image: 'https://via.placeholder.com/300x200?text=蓝牙音箱',
  },
])

const cart = ref([])
function addToCart(product) {
  cart.value.push(product)
}
</script>

<style scoped>
/* 页面背景 */
.shop-page {
  min-height: 100vh;
  background-color: #f3f4f6;
}

/* 顶部导航栏 */
.navbar {
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* 标题 */
.shop-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

/* 购物车图标 */
.cart-icon-wrapper {
  position: relative;
}

.cart-icon {
  width: 24px;
  height: 24px;
  color: #374151;
}

/* 数量角标动画 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-2px); }
  40%, 80% { transform: translateX(2px); }
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ef4444;
  color: white;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 9999px;
  font-weight: bold;
  animation: shake 2s infinite;
}

/* 产品网格 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
}

/* 商品卡片 */
.product-card {
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
}

/* 图片 */
.product-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
}

/* 商品名 */
.product-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

/* 价格 */
.product-price {
  color: #16a34a;
  font-weight: bold;
  margin-bottom: 1rem;
}

/* 按钮 */
.add-button {
  margin-top: auto;
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 0;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #1d4ed8;
}
</style>
