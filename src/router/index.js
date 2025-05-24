// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/LoginView.vue'
import Dashboard from '../view/dashboardView.vue'

const routes = [
  { path: '/', component: Login},
  { path: '/dashboard', component: Dashboard}
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  const user = localStorage.getItem('user')
  if(to.path != '/' && !user){
    next('/')
  }
  else{
    next()
  }
})

export default router
