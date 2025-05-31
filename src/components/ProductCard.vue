<template>
  <div class="product-card">
    <router-link :to="'/product/' + product.id" class="product-link">
      <img :src="product.image" :alt="product.name" class="product-image">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="price">
        <span class="current-price">¥{{ product.price }}</span>
        <span class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</span>
      </div>
      <div class="rating">
        <span class="stars">★★★★★</span>
        <span class="rating-count">{{ product.reviews }}条评价</span>
      </div>
      <div class="tags" v-if="product.isHot">
        <span class="hot-tag">热卖</span>
      </div>
    </router-link>
    <button class="add-to-cart" @click.stop="addToCart">加入购物车</button>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])

const addToCart = () => {
  emit('add-to-cart', props.product)
}
</script>

<style scoped>
.product-card {
  width: 220px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  transition: all 0.3s;
}
.product-card:hover {
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  transform: translateY(-5px);
}
.product-link {
  text-decoration: none;
  color: #333;
  display: block;
  margin-bottom: 10px;
}
.product-image {
  width: 100%;
  height: 220px;
  object-fit: contain;
}
.product-name {
  font-size: 14px;
  height: 40px;
  overflow: hidden;
  margin: 10px 0;
}
.price {
  margin: 10px 0;
}
.current-price {
  color: #e4393c;
  font-size: 18px;
  font-weight: bold;
}
.original-price {
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 5px;
}
.rating {
  font-size: 12px;
  color: #666;
}
.stars {
  color: #ff9900;
}
.rating-count {
  margin-left: 5px;
}
.tags {
  margin-top: 5px;
}
.hot-tag {
  display: inline-block;
  padding: 2px 5px;
  background: #e4393c;
  color: white;
  font-size: 12px;
  border-radius: 3px;
}
.add-to-cart {
  width: 100%;
  padding: 8px 0;
  background: #e4393c;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.add-to-cart:hover {
  background: #c03131;
}
</style>