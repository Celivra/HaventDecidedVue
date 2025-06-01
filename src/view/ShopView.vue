<!-- src/views/Shop.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">购物平台</h1>
      <router-link to="/cart" class="relative">
        <ShoppingCartIcon class="w-6 h-6 text-gray-700" />
        <span
          v-if="cart.length"
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1"
        >
          {{ cart.length }}
        </span>
      </router-link>
    </header>

    <!-- Product Grid -->
    <main class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-2xl shadow p-4 flex flex-col"
      >
        <!-- <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-40 object-cover rounded-xl mb-4"
        /> -->
        <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
        <p class="text-green-600 font-bold mb-4">￥{{ product.price }}</p>
        <button
          @click="addToCart(product)"
          class="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
        >
          加入购物车
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ShoppingCartIcon } from 'lucide-vue-next';
// eslint-disable-next-line no-unused-vars
import { useRouter } from 'vue-router';

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
]);

const cart = ref([]);
function addToCart(product) {
  cart.value.push(product);
}
</script>

<style scoped>
/* 产品卡片悬停时稍微放大和阴影加深 */
div[class*="bg-white"]:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* 按钮悬停时颜色渐变 */
button {
  transition: background-color 0.3s ease;
}

/* 购物车数量角标抖动动画 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-2px); }
  40%, 80% { transform: translateX(2px); }
}

span.absolute {
  animation: shake 2s infinite;
  /* 可选：放大点，提高识别度 */
  font-weight: 700;
  font-size: 0.75rem;
}
</style>