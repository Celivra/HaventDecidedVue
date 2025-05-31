<template>
  <div class="user-page">
    <div class="container">
      <!-- 用户信息概览 -->
      <div class="user-overview">
        <div class="user-avatar">
          <img :src="user.avatar" :alt="user.name">
        </div>
        <div class="user-info">
          <h2>{{ user.name }}</h2>
          <p>会员等级: {{ user.level }}</p>
          <p>账户余额: ¥{{ user.balance.toFixed(2) }}</p>
          <p>优惠券: {{ user.coupons }}张</p>
          <p>积分: {{ user.points }}</p>
        </div>
        <div class="user-actions">
          <router-link to="/user/orders" class="action-item">
            <span class="count">{{ user.orderCount }}</span>
            <span>我的订单</span>
          </router-link>
          <router-link to="/user/favorites" class="action-item">
            <span class="count">{{ user.favoriteCount }}</span>
            <span>我的收藏</span>
          </router-link>
          <router-link to="/user/address" class="action-item">
            <span class="count">{{ user.addressCount }}</span>
            <span>收货地址</span>
          </router-link>
        </div>
      </div>
      
      <!-- 订单状态快捷入口 -->
      <div class="order-status">
        <router-link 
          v-for="status in orderStatuses" 
          :key="status.id" 
          :to="'/user/orders?status=' + status.id"
          class="status-item"
        >
          <span class="icon" :class="'icon-' + status.id"></span>
          <span class="text">{{ status.text }}</span>
          <span class="count" v-if="status.count > 0">{{ status.count }}</span>
        </router-link>
      </div>
      
      <!-- 用户功能导航 -->
      <div class="user-nav">
        <div class="nav-section">
          <h3 class="section-title">订单中心</h3>
          <ul class="nav-list">
            <li>
              <router-link to="/user/orders">我的订单</router-link>
            </li>
            <li>
              <router-link to="/user/refunds">退款/退货</router-link>
            </li>
            <li>
              <router-link to="/user/evaluations">评价晒单</router-link>
            </li>
          </ul>
        </div>
        
        <div class="nav-section">
          <h3 class="section-title">资产中心</h3>
          <ul class="nav-list">
            <li>
              <router-link to="/user/coupons">优惠券</router-link>
            </li>
            <li>
              <router-link to="/user/balance">账户余额</router-link>
            </li>
            <li>
              <router-link to="/user/points">积分</router-link>
            </li>
          </ul>
        </div>
        
        <div class="nav-section">
          <h3 class="section-title">个人中心</h3>
          <ul class="nav-list">
            <li>
              <router-link to="/user/profile">个人资料</router-link>
            </li>
            <li>
              <router-link to="/user/address">收货地址</router-link>
            </li>
            <li>
              <router-link to="/user/security">账户安全</router-link>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- 最近浏览 -->
      <div class="recent-viewed">
        <h3 class="section-title">最近浏览</h3>
        <div class="product-list">
          <ProductCard 
            v-for="product in recentProducts" 
            :key="product.id" 
            :product="product" 
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'

const store = useStore()

const user = ref({
  id: 1,
  name: '京东用户',
  avatar: 'https://img10.360buyimg.com/imgzone/jfs/t1/186347/16/17155/163729/610f0c90E0b543582/7ddc0a1a82c92c3e.jpg',
  level: '金牌会员',
  balance: 1250.50,
  coupons: 5,
  points: 12500,
  orderCount: 15,
  favoriteCount: 23,
  addressCount: 3
})

const orderStatuses = ref([
  { id: 'pending', text: '待付款', count: 1 },
  { id: 'processing', text: '待发货', count: 2 },
  { id: 'shipped', text: '待收货', count: 1 },
  { id: 'review', text: '待评价', count: 3 },
  { id: 'refund', text: '退款/退货', count: 0 }
])

const recentProducts = ref([
  {
    id: 10,
    name: '小米12 Pro 5G手机',
    price: 4699,
    originalPrice: 4999,
    image: 'https://img10.360buyimg.com/n1/s450x450_jfs/t1/213928/18/3333/184953/618a5a5dE538a9a0a/1b9e0a5f5d5d5d5d.jpg',
    rating: 4.7,
    reviews: 25000
  },
  {
    id: 11,
    name: '华为MateBook 14 2021款',
    price: 5999,
    originalPrice: 6299,
    image: 'https://img10.360buyimg.com/n1/s450x450_jfs/t1/194322/16/1715/189363/609f28e0Ee6cb9a1a/4d5a5c5b5c5d5e5f.jpg',
    rating: 4.8,
    reviews: 18000
  },
  // 更多最近浏览商品...
])

const addToCart = (product) => {
  store.commit('addToCart', product)
}
</script>

<style scoped>
.user-page {
  padding: 20px 0;
  background: #f5f5f5;
}
.user-overview {
  display: flex;
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.user-avatar {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.user-info {
  flex: 1;
}
.user-info h2 {
  margin: 0 0 10px;
  font-size: 24px;
}
.user-info p {
  margin: 5px 0;
  color: #666;
}
.user-actions {
  display: flex;
  width: 300px;
  justify-content: space-around;
}
.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
}
.action-item .count {
  font-size: 24px;
  font-weight: bold;
  color: #e4393c;
}
.action-item:hover {
  color: #e4393c;
}

.order-status {
  display: flex;
  background: #fff;
  padding: 15px 0;
  margin-bottom: 20px;
  border-radius: 5px;
}
.status-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  position: relative;
}
.status-item .icon {
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.status-item .icon-pending {
  background-image: url('@/assets/icons/pending.png');
}
.status-item .icon-processing {
  background-image: url('@/assets/icons/processing.png');
}
.status-item .icon-shipped {
  background-image: url('@/assets/icons/shipped.png');
}
.status-item .icon-review {
  background-image: url('@/assets/icons/review.png');
}
.status-item .icon-refund {
  background-image: url('@/assets/icons/refund.png');
}
.status-item .count {
  position: absolute;
  top: -5px;
  right: 20px;
  background: #e4393c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.status-item:hover {
  color: #e4393c;
}

.user-nav {
  display: flex;
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.nav-section {
  flex: 1;
  padding: 0 20px;
  border-right: 1px solid #eee;
}
.nav-section:last-child {
  border-right: none;
}
.section-title {
  font-size: 18px;
  margin: 0 0 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-list li {
  margin-bottom: 10px;
}
.nav-list a {
  text-decoration: none;
  color: #666;
}
.nav-list a:hover {
  color: #e4393c;
}

.recent-viewed {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>