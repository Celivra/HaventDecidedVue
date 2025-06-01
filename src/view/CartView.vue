<template>
  <div class="min-h-screen bg-gray-100 p-4" v-bind:class="cart">
    <h1 class="text-2xl font-bold mb-4">购物车</h1>
    <div v-if="cart.length" class="space-y-4">
      <div
        v-for="(item, index) in cart"
        :key="index"
        class="bg-white p-4 rounded-xl shadow flex justify-between items-center"
      >
        <div>
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-green-600">￥{{ item.price }}</p>
        </div>
        <button
          class="text-red-500 hover:underline"
          @click="removeFromCart(index)"
        >
          移除
        </button>
      </div>
      <p class="text-lg font-bold text-right">总计: ￥{{ totalPrice }}</p>
    </div>
    <div v-else class="text-center text-gray-500">购物车为空</div>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue'

// 简单示例用本地状态（正式项目建议用 pinia）
const cart = ref([
  { title: '无线耳机', price: 199 },
  { title: '蓝牙音箱', price: 299 }
])

function removeFromCart(index) {
  cart.value.splice(index, 1)
}

const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price, 0)
)
</script>

<style scoped>
/* 添加进入/离开动画 */
.cart-enter-active,
.cart-leave-active {
  transition: all 0.3s ease;
}
.cart-enter-from,
.cart-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
