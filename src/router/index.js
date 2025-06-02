// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Shop from '../view/ShopView.vue';
import Cart from '../view/CartView.vue';
import Login from '../view/LoginView.vue'
import Register from '../view/RegisterView.vue'
import PageNotFound from '../view/PageNotFound.vue'

const routes = [
  { path: '/', name: 'Shop', component: Shop , meta:{title:'Home'}},
  { path: '/cart', name: 'Cart', component: Cart  , meta:{title:'Cart'}},
  { path: '/login', name: 'Login', component: Login , meta:{title:'Login'}},
  { path: '/register', name: 'Register', component: Register , meta:{title:'Register'}},
  { path: '/404', name: 'PageNotFound', component: PageNotFound, meta:{title:'404 Error'}},
];



const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  console.log("router before each")
  const user = localStorage.getItem('user')
  const pathExists = routes.find(route => route.path === to.path);
  if (!pathExists) {
    next('/404');
  }
  if(to.path != '/login'  && to.path != '/register' && to.path != '/' && to.path != '/404'&& !user){
    next({path:'/', query:{message:'请登入'}});
  }
  else{
    console.log(user)
    if (to.meta && to.meta.title) {
      document.title = to.meta.title
    } else {
      document.title = 'No Define Title'
    }
    next()
  }
})

export default router
