<template>
  <div class="category-page">
    <div class="container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/">首页</router-link> &gt;
        <span>{{ categoryName }}</span>
      </div>
      
      <!-- 分类内容 -->
      <div class="category-content">
        <!-- 侧边栏 -->
        <div class="sidebar">
          <h3 class="sidebar-title">分类</h3>
          <ul class="sub-categories">
            <li 
              v-for="sub in subCategories" 
              :key="sub.id"
              :class="{active: sub.id === currentSubCategory}"
              @click="currentSubCategory = sub.id"
            >
              {{ sub.name }}
            </li>
          </ul>
          
          <h3 class="sidebar-title">筛选</h3>
          <div class="filter-group" v-for="filter in filters" :key="filter.name">
            <h4>{{ filter.name }}</h4>
            <ul class="filter-options">
              <li 
                v-for="option in filter.options" 
                :key="option.value"
                :class="{active: selectedFilters[filter.name] === option.value}"
                @click="selectFilter(filter.name, option.value)"
              >
                {{ option.label }}
              </li>
            </ul>
          </div>
        </div>
        
        <!-- 商品列表 -->
        <div class="product-list">
          <div class="sort-bar">
            <div class="sort-options">
              <span 
                v-for="option in sortOptions" 
                :key="option.value"
                :class="{active: sortBy === option.value}"
                @click="sortBy = option.value"
              >
                {{ option.label }}
              </span>
            </div>
            <div class="pagination">
              <span>共 {{ totalProducts }} 件商品</span>
              <button 
                :disabled="currentPage === 1" 
                @click="currentPage--"
              >
                上一页
              </button>
              <span>第 {{ currentPage }} 页</span>
              <button 
                :disabled="currentPage * pageSize >= totalProducts" 
                @click="currentPage++"
              >
                下一页
              </button>
            </div>
          </div>
          
          <div class="products">
            <ProductCard 
              v-for="product in displayedProducts" 
              :key="product.id" 
              :product="product" 
              @add-to-cart="addToCart"
            />
          </div>
          
          <div class="pagination-bottom">
            <button 
              :disabled="currentPage === 1" 
              @click="currentPage--"
            >
              上一页
            </button>
            <span>第 {{ currentPage }} 页</span>
            <button 
              :disabled="currentPage * pageSize >= totalProducts" 
              @click="currentPage++"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const store = useStore()
const categoryId = route.params.id

// 分类数据
const categoryName = ref('手机数码')
const currentSubCategory = ref(null)
const sortBy = ref('default')
const currentPage = ref(1)
const pageSize = ref(12)
const selectedFilters = ref({})

const subCategories = ref([
  { id: 1, name: '手机通讯' },
  { id: 2, name: '手机配件' },
  { id: 3, name: '摄影摄像' },
  { id: 4, name: '数码配件' }
])

const filters = ref([
  {
    name: '品牌',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'huawei', label: '华为' },
      { value: 'xiaomi', label: '小米' },
      { value: 'oppo', label: 'OPPO' }
    ]
  },
  {
    name: '价格',
    options: [
      { value: '0-1000', label: '1000元以下' },
      { value: '1000-3000', label: '1000-3000元' },
      { value: '3000-5000', label: '3000-5000元' },
      { value: '5000-', label: '5000元以上' }
    ]
  }
])

const sortOptions = ref([
  { value: 'default', label: '默认' },
  { value: 'price-asc', label: '价格从低到高' },
  { value: 'price-desc', label: '价格从高到低' },
  { value: 'sales-desc', label: '销量从高到低' },
  { value: 'rating-desc', label: '评价从高到低' }
])

// 模拟商品数据
const allProducts = ref([
  {
    id: 1,
    name: 'Apple iPhone 13 Pro Max 远峰蓝色 256GB',
    price: 9799,
    originalPrice: 10999,
    image: 'https://img10.360buyimg.com/n1/s450x450_jfs/t1/197903/12/1832/363882/609f28e0E9cb0f9d1/1a8d1ca6f8eefedb.jpg',
    rating: 4.9,
    reviews: 50000,
    sales: 100000,
    brand: 'apple',
    category: 1
  },
  // 更多商品...
])

// 计算属性
const filteredProducts = computed(() => {
  let products = [...allProducts.value]
  
  // 按子分类筛选
  if (currentSubCategory.value) {
    products = products.filter(p => p.category === currentSubCategory.value)
  }
  
  // 按筛选条件筛选
  Object.entries(selectedFilters.value).forEach(([filterName, filterValue]) => {
    if (filterName === '品牌') {
      products = products.filter(p => p.brand === filterValue)
    } else if (filterName === '价格') {
      const [min, max] = filterValue.split('-').map(Number)
      if (min && max) {
        products = products.filter(p => p.price >= min && p.price <= max)
      } else if (min) {
        products = products.filter(p => p.price >= min)
      }
    }
  })
  
  return products
})

const sortedProducts = computed(() => {
  const products = [...filteredProducts.value]
  
  switch (sortBy.value) {
    case 'price-asc':
      return products.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return products.sort((a, b) => b.price - a.price)
    case 'sales-desc':
      return products.sort((a, b) => b.sales - a.sales)
    case 'rating-desc':
      return products.sort((a, b) => b.rating - a.rating)
    default:
      return products
  }
})

const displayedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return sortedProducts.value.slice(start, end)
})

const totalProducts = computed(() => {
  return filteredProducts.value.length
})

// 方法
const selectFilter = (filterName, filterValue) => {
  if (selectedFilters.value[filterName] === filterValue) {
    delete selectedFilters.value[filterName]
  } else {
    selectedFilters.value[filterName] = filterValue
  }
  currentPage.value = 1
}

const addToCart = (product) => {
  store.commit('addToCart', product)
}

// 监听路由变化
watch(() => route.params.id, (newId) => {
  // 这里应该是API调用获取分类信息
  // fetchCategoryDetails(newId)
  currentSubCategory.value = null
  selectedFilters.value = {}
  currentPage.value = 1
  sortBy.value = 'default'
})
</script>

<style scoped>
.category-page {
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
.category-content {
  display: flex;
  margin-top: 20px;
}
.sidebar {
  width: 200px;
  background: #fff;
  padding: 15px;
  margin-right: 20px;
}
.sidebar-title {
  font-size: 16px;
  margin: 15px 0 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.sub-categories {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sub-categories li {
  padding: 8px 0;
  cursor: pointer;
}
.sub-categories li:hover {
  color: #e4393c;
}
.sub-categories li.active {
  color: #e4393c;
  font-weight: bold;
}
.filter-group h4 {
  font-size: 14px;
  margin: 15px 0 10px;
  font-weight: normal;
}
.filter-options {
  list-style: none;
  padding: 0;
  margin: 0;
}
.filter-options li {
  padding: 5px 0;
  cursor: pointer;
  font-size: 12px;
}
.filter-options li:hover {
  color: #e4393c;
}
.filter-options li.active {
  color: #e4393c;
  font-weight: bold;
}
.product-list {
  flex: 1;
  background: #fff;
  padding: 15px;
}
.sort-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.sort-options {
  display: flex;
}
.sort-options span {
  margin-right: 20px;
  cursor: pointer;
  font-size: 14px;
}
.sort-options span.active {
  color: #e4393c;
  font-weight: bold;
}
.pagination {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.pagination button {
  margin: 0 10px;
  padding: 3px 8px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  cursor: pointer;
}
.pagination button:disabled {
  color: #ccc;
  cursor: not-allowed;
}
.products {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.pagination-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
.pagination-bottom button {
  margin: 0 15px;
  padding: 5px 15px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  cursor: pointer;
}
.pagination-bottom button:disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>