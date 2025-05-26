<template>
  <el-container class="login-container">
    <el-card class="login-card" shadow="always">
      <h2 class="title">Welcome</h2>
      <el-form :model="form" ref="loginForm" label-width="80px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="Please input username" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" placeholder="Please input password" show-password />
        </el-form-item>
        <el-button type="primary" style="width: 30%" @click="login">Login</el-button>
        <el-button type="primary" style="width: 30%" @click="register">Register</el-button>
        <div class="message" v-if="message" :style="{ color: messageColor }">
          {{ message }}
        </div>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      message: '',
      messageColor: 'red'
    };
  },
  methods: {
    register(){
      console.log("to reg")
      this.$router.push('/register')
    },
    async login() {
      if (!this.form.username || !this.form.password) {
        this.message = 'Please fill out Username and Password';
        this.messageColor = 'red';
        return;
      }

      try{
        const respon = await axios.post('/user/login',this.form)
        const result = respon.data
        if(result.success){
          this.messageColor = 'green';
          this.message = result.message;
          localStorage.setItem('user', JSON.stringify(result.user));
          this.$router.push('/dashboard')
        } else {
          this.messageColor = 'red';
          this.message = result.message;
        }

      }catch(err){
        this.messageColor = 'red';
        this.message = 'Internet Error';
      }

    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 400px;
  padding: 30px 20px;
  border-radius: 35px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.message {
  text-align: center;
  margin-top: 10px;
}
</style>
