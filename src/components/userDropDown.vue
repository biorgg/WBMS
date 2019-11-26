<template>
    <div>
    <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
        <p style='font-size:14px'>
            系统管理员
            <Icon type="ios-arrow-down"></Icon>
        </p>
        <DropdownMenu slot="list">
            <DropdownItem name="set-theme"> 主题设置</DropdownItem>
            <DropdownItem name="set-pwd"> 修改密码</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Modal v-model="themModal" title="请选择主题色" :mask-closable='false' footer-hide transfer :draggable="true">
        <div class="color-radio-group">
            <Icon class="color-radio" color="#2d8cf0" type="ios-radio-button-on" @click="changeColor('primary')"/>
            <Icon class="color-radio" color="#ff4c52" type="ios-radio-button-on" @click="changeColor('red')"/>
            <Icon class="color-radio" color="#0bb2d4" type="ios-radio-button-on" @click="changeColor('cyan')"/>
            <Icon class="color-radio" color="#11c26d" type="ios-radio-button-on" @click="changeColor('green')"/>
            <Icon class="color-radio" color="#17b3a3" type="ios-radio-button-on" @click="changeColor('turquoise')"/>
            <Icon class="color-radio" color="#667afa" type="ios-radio-button-on" @click="changeColor('indigo')"/>
            <Icon class="color-radio" color="#997b71" type="ios-radio-button-on" @click="changeColor('brown')"/>
            <Icon class="color-radio" color="#9463f7" type="ios-radio-button-on" @click="changeColor('purple')"/>
            <Icon class="color-radio" color="#757575" type="ios-radio-button-on" @click="changeColor('gray')"/>
            <Icon class="color-radio" color="#eb6709" type="ios-radio-button-on" @click="changeColor('orange')"/>
            <Icon class="color-radio" color="#f74584" type="ios-radio-button-on" @click="changeColor('pink')"/>
            <Icon class="color-radio" color="#fcb900" type="ios-radio-button-on" @click="changeColor('yellow')"/>
        </div>
    </Modal>
    </div>
</template>

<script>
import { setStore } from '@/util'

export default {
  name: 'userDropDown',
  data () {
    return {
      themModal: false,
      checkTheme: ''

    }
  },
  methods: {
    handleClickUserDropdown (name) {
      if (name === 'set-theme') {
        this.themModal = true
      }
    },
    changeColor (color) {
      if (color !== this.$store.state.user.theme) {
        this.$store.commit('user/SETTHEME', color)
        setStore('theme', color)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.color-radio-group{
    padding:10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content:space-between;
        .color-radio{
            cursor: pointer;
            height:30px;
            transition: all 0.3s;
            font-size:25px;
            &:hover {
                font-size: 30px;
            }
        }
}
</style>
