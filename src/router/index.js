// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Shop from '../view/ShopView.vue';
import Cart from '../view/CartView.vue';
import Login from '../view/LoginView.vue'
import Register from '../view/RegisterView.vue'

const routes = [
  { path: '/', name: 'Shop', component: Shop },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/login', name: 'Login', component: Login},
  { path: '/register', name: 'Register', component: Register},
];



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
