<template>
  <div class="home">
    <!-- 轮播图 -->
    <Carousel :images="bannerImages" />
    
    <!-- 分类入口 -->
    <div class="category-entry">
      <div class="container">
        <div class="entry-item" v-for="item in categories" :key="item.id">
          <router-link :to="'/category/' + item.id">
            <img :src="item.icon" :alt="item.name">
            <span>{{ item.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- 商品推荐 -->
    <div class="product-section">
      <div class="container">
        <h2 class="section-title">热门推荐</h2>
        <div class="product-list">
          <ProductCard 
            v-for="product in hotProducts" 
            :key="product.id" 
            :product="product" 
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </div>
    
    <!-- 更多商品区块 -->
    <!-- 可以根据需要添加更多区块 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Carousel from '@/components/Carousel.vue'
import ProductCard from '@/components/ProductCard.vue'

const bannerImages = ref([
  'https://img10.360buyimg.com/babel/s1580x600_jfs/t1/186347/16/17155/163729/610f0c90E0b543582/7ddc0a1a82c92c3e.jpg',
  'https://img10.360buyimg.com/babel/s1580x600_jfs/t1/178015/31/13828/120476/60ec0b0aEe2fd6a9a/cc0b5f5e3b6b8e1f.jpg',
  'https://img10.360buyimg.com/babel/s1580x600_jfs/t1/140012/34/1804/364050/5efbf28cE60dc62b8/98aeb74bdc079827.jpg'
])

const categories = ref([
  { id: 1, name: '手机数码', icon: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png' },
  { id: 2, name: '电脑办公', icon: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/115003/69/2882/4884/5ea6d924E23a87242/f07f08f28f5c8a7a.png' },
  { id: 3, name: '家用电器', icon: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/135733/4/897/4386/5ee7a89aEf79cf314/ed9861b4ddfb9f30.png' },
  { id: 4, name: '食品生鲜', icon: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/140012/34/1804/364050/5efbf28cE60dc62b8/98aeb74bdc079827.png' },
  { id: 5, name: '美妆护肤', icon: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/129215/21/5978/3618/5efbf28cE792aa4c8/658b3e81d1b9a4b4.png' }
])

const hotProducts = ref([
  {
    id: 1,
    name: 'Apple iPhone 13 Pro Max 远峰蓝色 256GB',
    price: 9799,
    originalPrice: 10999,
    image: 'https://img10.360buyimg.com/n1/s450x450_jfs/t1/197903/12/1832/363882/609f28e0E9cb0f9d1/1a8d1ca6f8eefedb.jpg',
    rating: 4.9,
    reviews: 50000,
    isHot: true
  },
  {
    id: 2,
    name: '联想小新Pro16 2021锐龙版 16英寸高性能轻薄笔记本电脑',
    price: 5999,
    originalPrice: 6499,
    image: 'https://img10.360buyimg.com/n1/s450x450_jfs/t1/194322/16/1715/189363/609f28e0Ee6cb9a1a/4d5a5c5b5c5d5e5f.jpg',
    rating: 4.8,
    reviews: 20000,
    isHot: true
  },
  // 更多商品...
])

const addToCart = (product) => {
  console.log('添加到购物车:', product)
  // 这里可以调用store中的action来更新购物车状态
}
</script>

<style scoped>
.home {
  flex: 1;
}
.category-entry {
  padding: 20px 0;
  background: #fff;
}
.entry-item {
  display: inline-block;
  width: 20%;
  text-align: center;
}
.entry-item img {
  width: 60px;
  height: 60px;
}
.entry-item span {
  display: block;
  margin-top: 10px;
  font-size: 14px;
}
.product-section {
  margin-top: 20px;
  background: #fff;
  padding: 20px 0;
}
.section-title {
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>