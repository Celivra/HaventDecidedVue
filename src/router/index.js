// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/LoginView.vue'
import Dashboard from '../view/dashboardView.vue'
import Register from '../view/RegisterView.vue'

const routes = [
  { path: '/', component: Login},
  { path: '/dashboard', component: Dashboard},
  { path: '/register', component: Register}
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  const user = localStorage.getItem('user')
  if(to.path != '/'  && to.path != '/register'&& !user){
    next('/')
  }
  else{
    next()
  }
})

export default router
