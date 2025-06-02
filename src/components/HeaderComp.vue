<template>
  <header class="header">
    <h1>My Shop</h1>
  </header>
  <nav class="navigation">
    <div class="nav-item">
      <div v-on:click="()=>{$router.push('/')}">Home</div>
      <div v-on:click="()=>{$router.push('/cart')}" style="margin-right: 40%;">Cart</div>
      <a v-if="user === null" href="/login"><div>Login</div></a>
      <div v-if="user" v-text="user.username"></div>
      <div v-if="user" v-on:click="logout">Logout</div>
    </div>
  </nav>
</template>
<script>
  export default{
    name: 'HeaderComp',
    data(){
      return{
        user: null,
      }
    },
    methods:{
      logout(){
        localStorage.removeItem("user");
        this.user = null;
        this.$router.push('/')
      }
    },
    created(){
      const userData = localStorage.getItem("user");
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
  }
</script>
<style scoped>
.navigation{
  background-color: #367d38;
  color: white;
}
.nav-item{
  width: 60%;
  margin-left: 41%;
}
.nav-item div{
  float: left;
  margin: 10px;
  padding: 10px 30px;
  transition: background-color 0.3s;
  border-radius: 10px;
}
.nav-item div:hover{
  background-color: #74ac76;
}
.header {
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
}
</style>
