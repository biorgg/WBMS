<template lang="pug">
  .login
    Card(class="login-form-layout")
      h1(class="title") 某某后台管理系统
      Form(autocomplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left")
        div(style="text-align: center")
          Icon(type="md-planet" style="width: 56px;height: 56px;color: #409EFF;font-size:56px")
          h2(class="login-title color-main") 欢迎登录
        FormItem(prop="username")
          Input(name="username" type="text" :autofocus="true" clearable v-model="loginForm.username" placeholder="请输入用户名")
            Icon(type="ios-person-outline" slot="prepend")
        FormItem(prop="password")
          inputPassWord(v-model="loginForm.password" placeholder="请输入密码" :icon="'ios-lock-outline'")
        FormItem(prop="code")
          .code
            Input(class="code-input" name="code" type="text" clearable v-model="loginForm.code"
              @keyup.enter.native="handleLogin" placeholder="请输入验证码")
              Icon(type="md-key" color="#888888" slot="prepend")
            img(class="code-img" :src="codeUrl" @load="loadImg" @click="getNewCode")
            div(v-if="codeLoading" class="code-img")
              Spin(style="display:inline-block")
        FormItem(style="margin-bottom: 60px")
          Button(style="width:100%;height:45px;margin-top:15px" type="info" size="large" :loading="loading" @click.native.prevent="handleLogin") 登录
    img(:src="LoginCenterBg" class="login-center-layout")
</template>

<script>
import { mapActions } from 'vuex'
import LoginCenterBg from '@/assets/images/login_center_bg.png'
import inputPassWord from '@/components/inputPassWord.vue'
import { userApi } from './../../api'
import http from './../../http'

const sha512 = require('js-sha512')

export default {
  name: 'login',
  components: {
    inputPassWord
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      loginRules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      codeLoading: true,
      codeUrl: '',
      randomStr: '',
      loading: false,
      LoginCenterBg
    }
  },
  created () {
    this.getNewCode()
  },
  methods: {
    ...mapActions(['login']),
    loadImg: function () {
      console.log('图片加载了')
      this.codeLoading = false
    },
    getNewCode: function () {
      this.randomStr = this.getrandomNum(15)
      // this.codeUrl = config.httpConfig.baseURL + '/code?randomStr=' + this.randomStr;
      this.codeUrl = 'http://192.168.1.143:9999/code?randomStr=' + this.randomStr
    },
    handleLogin: function () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let par = `?username=${this.loginForm.username}&password=${this.loginForm.password}&randomStr=${this.randomStr}&code=${this.loginForm.code}&grant_type=password&scope=server`

          http.request({
            url: `/auth/oauth/token${par}`,
            method: 'POST',
            data: {
              username: this.loginForm.username,
              password: this.loginForm.password,
              randomStr: this.randomStr,
              code: this.loginForm.code,
              grant_type: 'password',
              scope: 'server'
            },
            headers: {
              'Authorization': 'Basic dWNuOnVjbg==', 'TENANT-ID': '1'
            }
          }).then(function (res) {
            console.log(res)
          }).catch(function (e) {
            console.log('阿偶')
          })

          // this.api.post(`/auth/oauth/token`, {
          //   username: this.loginForm.username,
          //   password: this.loginForm.password,
          //   randomStr: this.randomStr,
          //   code: this.loginForm.code,
          //   grant_type: 'password',
          //   scope: 'server'
          // }, { headers: { 'Authorization': 'Basic dWNuOnVjbg==', 'TENANT-ID': '1' } }).then(function (res) {
          //   console.log(res)
          // }).catch(function (e) {
          //   console.log('阿偶')
          // })
          // this.loading = true
          // let timestamp = new Date().getTime()
          // let pwd1 = sha512(`${this.loginForm.password}:yzyx`)
          // let pwd2 = sha512(`${pwd1}${timestamp}`)
          // this.login({
          //   jobNo: this.loginForm.username,
          //   pwd: pwd2,
          //   timestamp: timestamp
          // }).then(res => {
          //   this.loading = false
          //   this.$Message.success({
          //     content: '登录成功,欢迎回来!',
          //     duration: 1,
          //     onClose: () => {
          //       this.$router.push({
          //         name: 'home_index'
          //       })
          //     }
          //   })
          // }).catch(err => {
          //   this.$Message.error({
          //     content: err.message
          //   })
          //   this.loading = false
          // })
        } else {
          this.$Message.error('请填写完整信息')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ivu-card-body {
  padding: 16px 30px 0;
}
.login {
  position: relative;
  height: 100vh;
  overflow: hidden;

  .login-form-layout {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 360px;
    transform: translate(-50%, -50%);
    border-top: 10px solid #409eff;
    background-image: linear-gradient(180deg, #fff 0%, rgb(190, 232, 243) 100%);
    transition: all 0.2s linear;
    z-index: 3;
    &:hover {
      top: 49%;
    }

    .title {
      color: #fff;
      width: 100vw;
      text-align: center;
      position: absolute;
      top: -18%;
      left: 50%;
      transform: translate(-50%, 0);
      font-size: 35px;
      font-weight: 400;
      white-space: nowrap;
    }

    .login-title {
      margin: 20px 0 20px;
      text-align: center;
    }

    /deep/ .ivu-input {
      height: 40px;
      line-height: 40px;
    }

    .code {
      display: flex;
      justify-content: space-between;
      .code-input {
        width: 55%;
      }
      .code-img {
        display: block;
        width: 40%;
        height: 38px;
        text-align: center;
        line-height: 38px;
      }
    }
  }

  .login-center-layout {
    position: absolute;
    background: rgb(38, 43, 48);
    z-index: 2;
    opacity: 0.2;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    top: 50%;
    transform: translate(0, -50%);
  }
  .hide-input {
    display: none;
  }
}
.login:after {
  content: "";
  position: absolute;
  width: 400%;
  height: 400%;
  background: linear-gradient(-45deg, #ee7752, #e45f92, #23a6d5, #23d5ab);
  animation: gradientBG 15s ease infinite;
  @keyframes gradientBG {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(-50%, -50%);
    }
    100% {
      transform: translate(0, 0);
    }
  }
}
</style>
