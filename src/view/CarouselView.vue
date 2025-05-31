<template>
  <div class="carousel">
    <div class="slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        class="slide"
      >
        <img :src="image" :alt="'Banner ' + (index + 1)">
      </div>
    </div>
    <div class="indicators">
      <span 
        v-for="(image, index) in images" 
        :key="index" 
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
    <button class="prev" @click="prevSlide">‹</button>
    <button class="next" @click="nextSlide">›</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  interval: {
    type: Number,
    default: 3000
  }
})

const currentIndex = ref(0)
let timer = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const startTimer = () => {
  timer = setInterval(nextSlide, props.interval)
}

const stopTimer = () => {
  clearInterval(timer)
}

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 20px;
}
.slides {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}
.slide {
  min-width: 100%;
  height: 100%;
}
.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.indicators span {
  width: 12px;
  height: 12px;
  margin: 0 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}
.indicators span.active {
  background: white;
}
.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.prev {
  left: 20px;
}
.next {
  right: 20px;
}
.prev:hover, .next:hover {
  background: rgba(0, 0, 0, 0.5);
}
</style>