// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/LoginView.vue'
import Dashboard from '../view/dashboardView.vue'
import Register from '../view/RegisterView.vue'
import Main from '../view/mainView.vue'
import PageNotFound from '../view/PageNotFound.vue'

const routes = [
  { path: '/login', component: Login, meta:{title:'LoginPage'}},
  { path: '/dashboard', component: Dashboard, meta:{title:'Dashboard'}},
  { path: '/register', component: Register, meta:{title:'Register'}},
  { path: '/', component: Main, meta:{title:'HomePage'}},
  { path: '/404', component: PageNotFound, meta:{title:'404'}}
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
