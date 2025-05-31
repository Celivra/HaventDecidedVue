<template>
  <div class="product-detail">
    <div class="container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/">首页</router-link> &gt;
        <router-link :to="'/category/' + product.categoryId">{{ product.categoryName }}</router-link> &gt;
        <span>{{ product.name }}</span>
      </div>
      
      <!-- 商品主区域 -->
      <div class="main-area">
        <!-- 商品图片 -->
        <div class="product-gallery">
          <div class="main-image">
            <img :src="currentImage || product.mainImage" :alt="product.name">
          </div>
          <div class="thumbnails">
            <img 
              v-for="(img, index) in product.images" 
              :key="index" 
              :src="img" 
              @mouseenter="currentImage = img"
              :class="{active: currentImage === img}"
            >
          </div>
        </div>
        
        <!-- 商品信息 -->
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          <div class="product-subtitle">{{ product.subtitle }}</div>
          
          <div class="price-area">
            <div class="price-row">
              <span class="label">价格</span>
              <span class="current-price">¥{{ product.price }}</span>
              <span class="original-price">¥{{ product.originalPrice }}</span>
            </div>
            <div class="promotion-row">
              <span class="label">促销</span>
              <span class="promotion">满减优惠</span>
            </div>
          </div>
          
          <div class="spec-area">
            <div class="spec-row" v-for="spec in product.specs" :key="spec.name">
              <span class="label">{{ spec.name }}</span>
              <div class="spec-options">
                <span 
                  v-for="option in spec.options" 
                  :key="option" 
                  :class="{active: selectedSpecs[spec.name] === option}"
                  @click="selectSpec(spec.name, option)"
                >
                  {{ option }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="quantity-area">
            <span class="label">数量</span>
            <div class="quantity-control">
              <button @click="decreaseQuantity">-</button>
              <input type="number" v-model.number="quantity" min="1">
              <button @click="increaseQuantity">+</button>
            </div>
            <span class="stock">库存 {{ product.stock }} 件</span>
          </div>
          
          <div class="action-area">
            <button class="add-to-cart" @click="addToCart">加入购物车</button>
            <button class="buy-now" @click="buyNow">立即购买</button>
          </div>
        </div>
      </div>
      
      <!-- 商品详情 -->
      <div class="product-description">
        <h2>商品详情</h2>
        <div v-html="product.description"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = route.params.id

const currentImage = ref('')
const quantity = ref(1)
const selectedSpecs = ref({})

const product = ref({
  id: productId,
  name: 'Apple iPhone 13 Pro Max 远峰蓝色 256GB',
  subtitle: 'A15仿生芯片，超视网膜XDR显示屏，Pro级摄像头系统',
  categoryId: 1,
  categoryName: '手机数码',
  price: 9799,
  originalPrice: 10999,
 