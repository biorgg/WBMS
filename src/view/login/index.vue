<template lang="pug">
  .login
    Card(class="login-form-layout")
      Form(autocomplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left")
        div(style="text-align: center")
          Icon(type="md-planet" style="width: 56px;height: 56px;color: #409EFF;font-size:56px")
          h2(class="login-title color-main") 欢迎登录
        FormItem(prop="username")
          Input(name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名")
            Icon(type="ios-person-outline" slot="prepend")
        FormItem(prop="password")
          Input(name="password" type="password" @keyup.enter.native="handleLogin"  v-model="loginForm.password" autoComplete="on" placeholder="请输入密码")
            Icon(type="ios-lock-outline" slot="prepend" )
        FormItem(style="margin-bottom: 60px")
          Button(style="width: 100%" type="info" size="large" :loading="loading" @click.native.prevent="handleLogin") 登录
    img(:src="login_center_bg" class="login-center-layout")
</template>

<script>
import login_center_bg from '@/assets/images/login_center_bg.png'

export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      // if (!isvalidUsername(value)) {
      //   callback(new Error('请输入正确的用户名'))
      // } else {
      //   callback()
      // }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        // username: [{required: true, trigger: 'blur', validator: validateUsername}],
        // password: [{required: true, trigger: 'blur', validator: validatePass}]
      },
      loading: false,
      login_center_bg
    }
  },
  created () {
    console.log(this.login_center_bg)
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  /deep/ .ivu-card-body{
    padding: 16px 30px 16px
  }
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;

    .login-title {
      margin:20px 0 20px;
      text-align: center;
    }

    /deep/ .ivu-input{
      height: 40px;
      line-height: 40px;
    }
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>
