<template>
  <el-container class="register-container">
    <el-card class="register-card" shadow="always">
      <h2 class="title">Register</h2>
      <el-form :model="form" :rules="rules" ref="registerForm" label-width="100px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email"/>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="form.phone"/>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="ConfirmPd" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 40%" @click="register">Register</el-button>
          <el-button type="primary" style="width: 40%" @click="login">Back</el-button>
        </el-form-item>
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
  name: 'RegisterView',
  data() {
    return {
      form: {
        username: '',
        email: '',
        phone: '',
        password: ''
      },
      confirmPassword: '',
      message: '',
      messageColor: 'red',
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        phone:[{required:true, message: 'Please input phone number', trigger:'blur'}],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error('两次密码输入不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    login(){
      this.$router.push('/')
    },
    register() {
      this.$refs.registerForm.validate(async valid => {
        if (!valid) return;
        try{
          const response = await axios.post('/register', this.form);
          const result = response.data;
          if(result.success){
            this.messageColor = 'green';
            this.message = result.message;
          }else{
            this.messageColor = 'red';
            this.message = result.message;
          }
        }catch(err){
          this.messageColor = 'red';
          this.message = 'Internet Error';
        }

      });
    }
  }
};
</script>

<style scoped>
.register-container {
  height: 100vh;
  background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-card {
  width: 450px;
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
