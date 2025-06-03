<template>
  <HeaderComp />
  <div class="cart-page">
    <h1 class="cart-title">购物车</h1>

    <div v-if="cart.length" class="cart-list">
      <div
        v-for="(item, index) in cart"
        :key="index"
        class="cart-item"
      >
        <div class="item-info">
          <h2 class="item-title">{{ item.title }}</h2>
          <p class="item-price">￥{{ item.price }}</p>
        </div>
        <button class="remove-button" @click="removeFromCart(index)">
          移除
        </button>
      </div>

      <p class="cart-total">总计: ￥{{ totalPrice }}</p>
    </div>

    <div v-else class="empty-message">购物车为空</div>
  </div>
  <FooterComp />
</template>

<script setup>
import { ref, computed } from 'vue'
import FooterComp from '@/components/FooterComp.vue'
import HeaderComp from '@/components/HeaderComp.vue'

// 示例数据（正式项目建议使用 pinia 或 Vuex 管理全局状态）
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
.cart-page {
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 1.5rem;
}

.cart-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.item-price {
  color: #16a34a;
  font-weight: bold;
}

.remove-button {
  color: #ef4444;
  background: transparent;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.remove-button:hover {
  color: #dc2626;
}

.cart-total {
  text-align: right;
  font-weight: bold;
  font-size: 1.125rem;
  margin-top: 1rem;
}

.empty-message {
  text-align: center;
  color: #9ca3af;
  font-size: 1rem;
  margin-top: 2rem;
}

/* 动画效果 */
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
