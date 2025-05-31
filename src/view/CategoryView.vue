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
              <span class="discount">{{ discountRate }}折</span>
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
                  :class="{active: selectedSpecs[spec.name] === option, disabled: !option.available}"
                  @click="selectSpec(spec.name, option)"
                >
                  {{ option.name }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="quantity-area">
            <span class="label">数量</span>
            <div class="quantity-control">
              <button @click="decreaseQuantity">-</button>
              <input type="number" v-model.number="quantity" min="1" :max="product.stock">
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
      
      <!-- 商品详情和评价 -->
      <div class="product-tabs">
        <div class="tab-header">
          <span 
            v-for="tab in tabs" 
            :key="tab.id" 
            :class="{active: activeTab === tab.id}"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </span>
        </div>
        
        <div class="tab-content">
          <!-- 商品详情 -->
          <div v-show="activeTab === 'detail'" class="product-description">
            <h2>商品详情</h2>
            <div v-html="product.description"></div>
          </div>
          
          <!-- 规格参数 -->
          <div v-show="activeTab === 'spec'" class="product-specs">
            <h2>规格参数</h2>
            <table>
              <tr v-for="param in product.params" :key="param.name">
                <th>{{ param.name }}</th>
                <td>{{ param.value }}</td>
              </tr>
            </table>
          </div>
          
          <!-- 商品评价 -->
          <div v-show="activeTab === 'review'" class="product-reviews">
            <h2>商品评价 ({{ product.reviews.length }})</h2>
            <div class="review-summary">
              <div class="overall-rating">
                <span class="rating-value">{{ averageRating.toFixed(1) }}</span>
                <span class="rating-stars">★★★★★</span>
                <span>平均评分</span>
              </div>
              <div class="rating-distribution">
                <div v-for="i in 5" :key="i" class="rating-bar">
                  <span class="stars">{{ 6 - i }}星</span>
                  <div class="bar-container">
                    <div class="bar" :style="{width: ratingPercentage(6 - i) + '%'}"></div>
                  </div>
                  <span class="count">{{ ratingCount(6 - i) }}人</span>
                </div>
              </div>
            </div>
            
            <div class="review-list">
              <div v-for="review in product.reviews" :key="review.id" class="review-item">
                <div class="user-info">
                  <img :src="review.user.avatar" :alt="review.user.name" class="avatar">
                  <span class="username">{{ review.user.name }}</span>
                </div>
                <div class="review-content">
                  <div class="rating-stars">★★★★★</div>
                  <div class="review-text">{{ review.content }}</div>
                  <div class="review-images" v-if="review.images.length > 0">
                    <img 
                      v-for="(img, index) in review.images" 
                      :key="index" 
                      :src="img" 
                      @click="showImagePreview(img)"
                    >
                  </div>
                  <div class="review-meta">
                    <span class="date">{{ review.date }}</span>
                    <span class="sku">购买规格: {{ review.sku }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 猜你喜欢 -->
      <div class="recommendations">
        <h2>猜你喜欢</h2>
        <div class="product-list">
          <ProductCard 
            v-for="product in recommendedProducts" 
            :key="product.id" 
            :product="product" 
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </div>
    
    <!-- 图片预览模态框 -->
    <div v-if="previewImage" class="image-preview-modal" @click="previewImage = ''">
      <img :src="previewImage" @click.stop>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const store = useStore()
const productId = route.params.id

// 商品数据
const product = ref({
  id: productId,
  name: 'Apple iPhone 13 Pro Max 远峰蓝色 256GB',
  subtitle: 'A15仿生芯片，超视网膜XDR显示屏，Pro级摄像头系统',
  categoryId: 1,
  categoryName: '手机数码',
  price: 9799,
  originalPrice: 10999,
  mainImage: 'https://img10.360buyimg.com/n1/s450x450_jfs/t1/197903/12/1832/363882/609f28e0E9cb0f9d1/1a8d1ca6f8eefedb.jpg',
  images: [
    'https://img10.360buyimg.com/n1/s450x450_jfs/t1/197903/12/1832/363882/609f28e0E9cb0f9d1/1a8d1ca6f8eefedb.jpg',
    'https://img10.360buyimg.com/n1/s450x450_jfs/t1/186347/16/17155/163729/610f0c90E0b543582/7ddc0a1a82c92c3e.jpg',
    'https://img10.360buyimg.com/n1/s450x450_jfs/t1/178015/31/13828/120476/60ec0b0aEe2fd6a9a/cc0b5f5e3b6b8e1f.jpg'
  ],
  stock: 100,
  sales: 50000,
  specs: [
    {
      name: '颜色',
      options: [
        { name: '远峰蓝色', available: true },
        { name: '银色', available: true },
        { name: '金色', available: false },
        { name: '石墨色', available: true }
      ]
    },
    {
      name: '容量',
      options: [
        { name: '128GB', available: true },
        { name: '256GB', available: true },
        { name: '512GB', available: true },
        { name: '1TB', available: false }
      ]
    }
  ],
  params: [
    { name: '品牌', value: 'Apple' },
    { name: '型号', value: 'iPhone 13 Pro Max' },
    { name: '操作系统', value: 'iOS 15' },
    { name: '屏幕尺寸', value: '6.7英寸' },
    { name: '处理器', value: 'A15仿生芯片' },
    { name: '内存', value: '6GB' },
    { name: '后置摄像头', value: '1200万像素三摄' },
    { name: '前置摄像头', value: '1200万像素' },
    { name: '电池容量', value: '4352mAh' }
  ],
  description: `
    <p><strong>A15仿生芯片，速度超快</strong></p>
    <p>全新6核中央处理器，具有2个性能核心和4个能效核心</p>
    <p>全新5核图形处理器</p>
    <p>全新16核神经网络引擎</p>
    <p><img src="https://img10.360buyimg.com/imgzone/jfs/t1/200482/12/1071/134022/610f0c90E7b559c2a/9c0c3c8e3d3b3b3b.jpg" /></p>
    <p><strong>超视网膜XDR显示屏</strong></p>
    <p>6.7英寸 (对角线) OLED全面屏</p>
    <p>2778 x 1284像素分辨率，458 ppi</p>
    <p>ProMotion自适应刷新率技术，最高可达120Hz</p>
  `,
  reviews: [
    {
      id: 1,
      user: {
        name: '京东用户',
        avatar: 'https://img10.360buyimg.com/imgzone/jfs/t1/186347/16/17155/163729/610f0c90E0b543582/7ddc0a1a82c92c3e.jpg'
      },
      rating: 5,
      content: '手机非常好用，运行流畅，拍照效果很棒，电池续航也很给力，非常满意的一次购物体验！',
      images: [
        'https://img10.360buyimg.com/imgzone/jfs/t1/200482/12/1071/134022/610f0c90E7b559c2a/9c0c3c8e3d3b3b3b.jpg',
        'https://img10.360buyimg.com/imgzone/jfs/t1/178015/31/13828/120476/60ec0b0aEe2fd6a9a/cc0b5f5e3b6b8e1f.jpg'
      ],
      date: '2023-05-15',
      sku: '远峰蓝色 256GB'
    },
    // 更多评价...
  ]
})

// 推荐商品
const recommendedProducts = ref([
  {
    id: 3,
    name: 'Apple iPhone 13 星光色 128GB',
    price: 5999,
    originalPrice: 6799,
    image: 'https://img10.360buyimg.com/n1/s450x450_jfs/t1/213928/18/3333/184953/618a5a5dE538a9a0a/1b9e0a5f5d5d5d5d.jpg',
    rating: 4.8,
    reviews: 30000
  },
  // 更多推荐商品...
])

// 状态管理
const currentImage = ref('')
const quantity = ref(1)
const selectedSpecs = ref({})
const activeTab = ref('detail')
const previewImage = ref('')
const tabs = ref([
  { id: 'detail', name: '商品详情' },
  { id: 'spec', name: '规格参数' },
  { id: 'review', name: '商品评价(500+)' }
])

// 计算属性
const discountRate = computed(() => {
  return (product.value.price / product.value.originalPrice * 10).toFixed(1)
})

const averageRating = computed(() => {
  if (product.value.reviews.length === 0) return 0
  const sum = product.value.reviews.reduce((total, review) => total + review.rating, 0)
  return sum / product.value.reviews.length
})

// 方法
const selectSpec = (specName, option) => {
  if (!option.available) return
  selectedSpecs.value[specName] = option.name
}

const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  const item = {
    ...product.value,
    selectedSpecs: {...selectedSpecs.value},
    quantity: quantity.value
  }
  store.commit('addToCart', item)
  // 这里可以添加购物车添加成功的提示
}

const buyNow = () => {
  addToCart()
  // 跳转到结算页面
  // router.push('/checkout')
}

const ratingPercentage = (stars) => {
  const count = product.value.reviews.filter(r => r.rating === stars).length
  return (count / product.value.reviews.length) * 100
}

const ratingCount = (stars) => {
  return product.value.reviews.filter(r => r.rating === stars).length
}

const showImagePreview = (img) => {
  previewImage.value = img
}

// 初始化
onMounted(() => {
  // 这里应该是API调用获取商品详情
  // fetchProductDetails(productId)
  currentImage.value = product.value.images[0]
  // 初始化选中的规格
  product.value.specs.forEach(spec => {
    const availableOption = spec.options.find(opt => opt.available)
    if (availableOption) {
      selectedSpecs.value[spec.name] = availableOption.name
    }
  })
})
</script>

<style scoped>
.product-detail {
  padding: 20px 0;
  background: #f5f5f5;
}
.breadcrumb {
  padding: 10px 0;
  color: #999;
}
.breadcrumb a {
  color: #999;
  text-decoration: none;
}
.breadcrumb a:hover {
  color: #e4393c;
}
.main-area {
  display: flex;
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
}
.product-gallery {
  width: 400px;
}
.main-image {
  width: 400px;
  height: 400px;
  border: 1px solid #eee;
  margin-bottom: 10px;
}
.main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.thumbnails {
  display: flex;
  gap: 10px;
}
.thumbnails img {
  width: 60px;
  height: 60px;
  border: 1px solid #eee;
  cursor: pointer;
}
.thumbnails img.active {
  border-color: #e4393c;
}
.product-info {
  flex: 1;
  padding-left: 30px;
}
.product-title {
  font-size: 24px;
  margin: 0 0 10px;
  color: #333;
}
.product-subtitle {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}
.price-area {
  background: #f5f5f5;
  padding: 15px;
  margin-bottom: 20px;
}
.price-row, .promotion-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.label {
  width: 60px;
  color: #999;
}
.current-price {
  font-size: 24px;
  color: #e4393c;
  font-weight: bold;
  margin-right: 10px;
}
.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  margin-right: 10px;
}
.discount {
  display: inline-block;
  padding: 2px 5px;
  background: #e4393c;
  color: white;
  font-size: 12px;
  border-radius: 3px;
}
.promotion {
  color: #e4393c;
}
.spec-area {
  margin-bottom: 20px;
}
.spec-row {
  display: flex;
  margin-bottom: 15px;
}
.spec-options {
  flex: 1;
}
.spec-options span {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #ddd;
  margin-right: 10px;
  margin-bottom: 5px;
  cursor: pointer;
}
.spec-options span.active {
  border-color: #e4393c;
  color: #e4393c;
}
.spec-options span.disabled {
  color: #ccc;
  cursor: not-allowed;
  position: relative;
}
.spec-options span.disabled::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #ccc;
  transform: rotate(-15deg);
}
.quantity-area {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.quantity-control {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.quantity-control button {
  width: 30px;
  height: 30px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  cursor: pointer;
}
.quantity-control input {
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid #ddd;
  margin: 0 5px;
}
.stock {
  color: #999;
  font-size: 14px;
}
.action-area {
  display: flex;
  gap: 15px;
}
.add-to-cart, .buy-now {
  padding: 12px 30px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.add-to-cart {
  background: #ff9500;
  color: white;
}
.buy-now {
  background: #e4393c;
  color: white;
}
.add-to-cart:hover {
  background: #e68600;
}
.buy-now:hover {
  background: #c03131;
}

/* 商品标签页样式 */
.product-tabs {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
}
.tab-header {
  border-bottom: 2px solid #e4393c;
  margin-bottom: 20px;
}
.tab-header span {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}
.tab-header span.active {
  background: #e4393c;
  color: white;
}
.product-description {
  padding: 20px;
}
.product-specs table {
  width: 100%;
  border-collapse: collapse;
}
.product-specs th, .product-specs td {
  padding: 10px;
  border: 1px solid #eee;
  text-align: left;
}
.product-specs th {
  width: 150px;
  background: #f9f9f9;
}

/* 评价区域样式 */
.review-summary {
  display: flex;
  padding: 20px;
  background: #f9f9f9;
  margin-bottom: 20px;
}
.overall-rating {
  width: 200px;
  text-align: center;
  padding-right: 20px;
  border-right: 1px solid #eee;
}
.rating-value {
  font-size: 36px;
  color: #e4393c;
  display: block;
  line-height: 1;
}
.rating-stars {
  color: #ff9900;
  font-size: 20px;
  display: block;
  margin: 5px 0;
}
.rating-distribution {
  flex: 1;
  padding-left: 20px;
}
.rating-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.stars {
  width: 50px;
}
.bar-container {
  flex: 1;
  height: 10px;
  background: #eee;
  margin: 0 10px;
}
.bar {
  height: 100%;
  background: #ff9900;
}
.count {
  width: 60px;
  color: #999;
}

/* 评价列表样式 */
.review-list {
  padding: 0 20px;
}
.review-item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.user-info {
  width: 120px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.username {
  display: block;
  margin-top: 5px;
  color: #666;
}
.review-content {
  flex: 1;
}
.review-text {
  margin: 10px 0;
  line-height: 1.6;
}
.review-images {
  margin: 10px 0;
}
.review-images img {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  cursor: pointer;
}
.review-meta {
  color: #999;
  font-size: 12px;
}
.review-meta span {
  margin-right: 15px;
}

/* 猜你喜欢区域 */
.recommendations {
  background: #fff;
  padding: 20px;
}
.recommendations h2 {
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* 图片预览模态框 */
.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.image-preview-modal img {
  max-width: 80%;
  max-height: 80%;
}
</style>