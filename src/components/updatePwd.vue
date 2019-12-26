<template>
<Modal v-model="modalStatus" title="修改密码" :closable="updatePwdType === 0" :mask-closable="false" :footer-hide="true" @on-visible-change="reset">
    <div class="resetPwd">
        <h3 v-if="updatePwdType === 1" style="color:red;margin-bottom:10px">首次登陆请先修改密码</h3>
        <h3 v-if="updatePwdType === 2" style="color:red;margin-bottom:10px">已经超过1个月没修改过密码了哦~请修改密码后使用~</h3>
        <Form ref="resetPassWordForm" :model="resetPassWordForm" :rules="resetPassWordFormRules" :label-width="110">
            <FormItem prop="oldPwd" label="原密码：" style="width:350px">
                <Input type="password" v-model="resetPassWordForm.oldPwd" placeholder="请输入原密码" clearable></Input>
            </FormItem>
            <FormItem prop="newPwd" label="新密码：" style="width:350px">
                <Input type="password" v-model="resetPassWordForm.newPwd" placeholder="6位以上,并且包含大小写字母和数字" clearable></Input>
            </FormItem>
            <FormItem prop="secNewPwd" label="重复新密码：" style="width:350px">
                <Input type="password" v-model="resetPassWordForm.secNewPwd" placeholder="请再输入一次新密码" clearable></Input>
            </FormItem>
            <FormItem style="width:350px">
                <Button style="margin-right:20px" @click="_loginOut">退出登录</Button>
                <!--<Button style="margin-right:20px" @click="reset">重置</Button>-->
                <Button type="primary"  @click="submitPwd" :loading="resetPassWordBtnLoading">提交</Button>
            </FormItem>
        </Form>
    </div>
</Modal>
</template>

<script>
// import {user} from './../../api'
import {mapGetters, mapActions} from 'vuex'
const sha512 = require('js-sha512')

export default {
  name: 'UpdatePwd',
  props: {
    updatePwdModalStatus: {
      type: Boolean,
      default: false
    },
    updatePwdType: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // resetPassWordModalShow: false,
      modalStatus: this.updatePwdModalStatus,
      resetPassWordForm: {
        oldPwd: '',
        newPwd: '',
        secNewPwd: ''
      },
      resetPassWordFormRules: {
        oldPwd: [
          {required: true, message: '请输入旧密码'}
        ],
        newPwd: [
          {required: true, validator: this.newPwdValidator, trigger: 'blur'}
        ],
        secNewPwd: [
          {required: true, validator: this.secNewPwdValidator}
        ]
      },
      // 首次修改密码:1,隔一个月修改密码:2,主动修改密码:0(直接从vuex中获取updatePwdType)
      // resetPwsType: 0,
      resetPassWordBtnLoading: false
    }
  },
  watch: {
    updatePwdModalStatus (newval) {
      this.modalStatus = newval
    },
    modalStatus (newval) {
      if (!newval) {
        this.$emit('update:updatePwdModalStatus', false)
      }
    }
  },
  computed: {
    // modalStatus: {
    //   get () {
    //     return this.updatePwdModalStatus
    //   },
    //   set (val) {
    //     this.updatePwdModalStatus = val
    //   }
    // }
    // ...mapGetters([]),
    // updatePwdModalStatus: {
    //   get () {
    //     return this.$store.state.user.updatePwdModalStatus
    //   },
    //   set (val) {
    //     this.$store.state.user.updatePwdModalStatus = val
    //   }
    // },
    // updatePwdType: {
    //   get () {
    //     return this.$store.state.user.updatePwdModalType
    //   }
    // }
  },
  mounted () {
    this.checkPwd()
    // this.reset();
  },
  methods: {
    ...mapActions(['logout']),
    reset () {
      this.$refs.resetPassWordForm.resetFields()
    },
    // 退出登陆
    _loginOut () {
      this.logout()
      window.location.reload()
    },
    checkPwd (params) {
    //   user.checkPwd(params, res => {
    //     if (res.status === 1) {
    //       console.log('密码验证通过,无需修改~')
    //     } else if (res.status === 10020) {
    //       // this.resetPwsType = 1;
    //       this.$store.commit('SETUPDATEPWDMOADLTYPE', 1)
    //       // this.resetPassWordModalShow = true;
    //       this.$store.commit('SETUPDATEPWDMOADL', true)
    //     } else if (res.status === 10019) {
    //       // this.resetPwsType = 2;
    //       this.$store.commit('SETUPDATEPWDMOADLTYPE', 2)
    //       // this.resetPassWordModalShow = true;
    //       this.$store.commit('SETUPDATEPWDMOADL', true)
    //     } else {
    //       this.$Message.error('密码验证请求失败')
    //     }
    //   })
    },
    newPwdValidator (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value === this.resetPassWordForm.oldPwd) {
        callback(new Error('新密码不能与旧密码相同'))
      } else {
        let reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        if (!reg.test(value)) {
          callback(new Error('密码必须大于6位,并且包含英文大小写和数字'))
        }
      }
      callback()
    },
    secNewPwdValidator (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.resetPassWordForm.newPwd !== value) {
          callback(new Error('两次输入密码不相同'))
        }
      }
      callback()
    },
    submitPwd () {
      this.resetPassWordBtnLoading = true
      this.$refs.resetPassWordForm.validate(valid => {
        if (valid) {
          this.$Message.success('修改成功!')
        //   let timestamp = new Date().getTime()
        //   let pwd1 = sha512(`${this.resetPassWordForm.oldPwd}:yzyx`)
        //   let pwd2 = sha512(`${pwd1}${timestamp}`)
        //   let par = {
        //     oldPassword: pwd2,
        //     newPassword: sha512(`${this.resetPassWordForm.newPwd}:yzyx`),
        //     timestamp: timestamp
        //   }
        //   user.updatePassword(par, res => {
        //     if (res.status === 1) {
        //       this.$store.commit('SETUPDATEPWDMOADLTYPE', 0)
        //       this.$Message.success('密码修改成功')
        //       // this.resetPassWordModalShow = false;
        //       this.$store.commit('SETUPDATEPWDMOADL', false)
        //       this.resetPassWordBtnLoading = false
        //       setTimeout(() => {
        //         this._loginOut()
        //       }, 1000)
        //     } else if (res.status === 10004) {
        //       this.$Message.error('原密码错误!')
        //       this.resetPassWordBtnLoading = false
        //     } else {
        //       this.$Message.error(res.message)
        //       this.resetPassWordBtnLoading = false
        //     }
        //   })
        } else {
          this.$Message.warning('请填写完整信息!')
          this.resetPassWordBtnLoading = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .resetPwd{
        padding: 0 30px 0
    }
</style>
