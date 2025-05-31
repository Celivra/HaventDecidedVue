// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/HomeView.vue'
import Category from '../view/CategoryView.vue'
import Product from '../view/ProductView.vue'
import Cart from '../view/CartView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/user',
    name: 'User',
    component: User
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  const user = localStorage.getItem('user')
  const pathExists = routes.find(route => route.path === to.path);
  if (!pathExists) {
    next('/404');
  }
  if(to.path != '/login'  && to.path != '/register' && to.path != '/' && to.path != '/404'&& !user){
    next({path:'/', query:{message:'请登入'}});
  }
  else{
    if (to.meta && to.meta.title) {
      document.title = to.meta.title
    } else {
      document.title = 'No Define Title'
    }
    next()
  }
})

export default router
