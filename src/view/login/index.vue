<template lang="pug">
  .login
    Card(class="login-form-layout")
      Form(autocomplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left")
        div(style="text-align: center")
          Icon(type="md-planet" style="width: 56px;height: 56px;color: #409EFF;font-size:56px")
          h2(class="login-title color-main") 欢迎登录
        FormItem(prop="username")
          Input(name="username" type="text" clearable v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名")
            Icon(type="ios-person-outline" slot="prepend")
        FormItem(prop="password")
          Input(name="password" type="password" clearable  @keyup.enter.native="handleLogin"  v-model="loginForm.password" autoComplete="on" placeholder="请输入密码")
            Icon(type="ios-lock-outline" slot="prepend" )
        FormItem(style="margin-bottom: 60px")
          Button(style="width: 100%" type="info" size="large" :loading="loading" @click.native.prevent="handleLogin") 登录
    img(:src="LoginCenterBg" class="login-center-layout")
</template>

<script>
import LoginCenterBg from '@/assets/images/login_center_bg.png'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      loading: false,
      LoginCenterBg
    }
  },
  created () {},
  methods: {
    handleLogin: function () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {

        } else {
          this.$Message.error('请填写完整信息')
        }
      })
    }
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
