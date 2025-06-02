<template>
  <header class="header">
    <h1>My Shop</h1>
  </header>
  <nav class="navigation">
    <div class="nav-item">
      <a href="/"><div>Home</div></a>
      <a href="/cart"><div>Cart</div></a>
      <a href="/login"><div style="margin-left: 50%;">Login</div></a>
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
  width: 50%;
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
