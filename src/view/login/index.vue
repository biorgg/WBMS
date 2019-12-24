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
import { mapActions } from 'vuex'
import LoginCenterBg from '@/assets/images/login_center_bg.png'
const sha512 = require('js-sha512')

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
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
    ...mapActions(['login']),
    handleLogin: function () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          let timestamp = new Date().getTime()
          let pwd1 = sha512(`${this.loginForm.password}:yzyx`)
          let pwd2 = sha512(`${pwd1}${timestamp}`)
          this.login({
            jobNo: this.loginForm.username,
            pwd: pwd2,
            timestamp: timestamp
          }).then(res => {
            this.loading = false
            this.$Message.success({
              content: '登录成功,欢迎回来!',
              duration: 1,
              onClose: () => {
                this.$router.push({
                  name: 'home_index'
                })
              }
            })
          }).catch(err => {
            this.$Message.error({
              content: err.message
            })
            this.loading = false
          })
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
  .login{
    // background-image: linear-gradient(160deg, #fff1eb 0%,#ace0f9 100%);
    height:100vh;
    widows: 100vw;
    background: linear-gradient(-45deg,  #ee7752, #e45f92, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradientBG 20s ease infinite;
    @keyframes gradientBG {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    .login-form-layout {
      position: absolute;
      left: 0;
      right: 0;
      top:0;
      width: 360px;
      margin: 140px auto;
      border-top: 10px solid #409EFF;
      background-image: linear-gradient(180deg, #fff 0%,rgb(190, 232, 243) 100%);
      transition: all 0.2s linear;
       z-index: 3;
      &:hover{
        top:-5px;
      }

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
      background: rgb(38, 43, 48);
      z-index: 2;
      opacity: 0.2;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      margin-top: 200px;
    }
  }
</style>
