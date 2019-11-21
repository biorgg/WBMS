<template lang="pug">
  .main
    .main-top
      .top-logo(:style="'width:'+(!shrink?'230px':'60px')")
        span(v-if="!shrink")  YOUR LOGO
        span(v-if="shrink" style="font-size:15px")  LOGO
      .top-button(@click="shrink=!shrink")
        Icon(type="md-reorder" :style="{transform: 'rotateZ(' + (shrink ? '-90' : '0') + 'deg)'}")
      .top-button(@click="goHomePage")
        Tooltip(content="返回首页" placement="bottom" transfer)
          Icon(type="md-home")
      div(style="float:right")
        .top-button
          full-screen(v-model="isFullScreen")
        .top-button(style="width:auto;padding:0 10px 0")
          Dropdown(transfer trigger="click")
            p(style='font-size:14px')
              | 系统管理员
              Icon(type="ios-arrow-down")
            DropdownMenu(slot="list")
              DropdownItem 主题设置
              DropdownItem 修改密码
        .top-button(@click="")
          Tooltip(content="退出登录" placement="bottom" transfer)
            Icon(type="md-power")
    .sidebar-menu-con
      shrinkable-menu(:shrink="shrink" :menuList="menuList")
    .single-page-con(:style="!shrink?'left:230px;width:calc(100vw - 230px);':'left:60px;width:calc(100vw - 60px);'")
      .single-page
        Card
          router-view
</template>

<script>
import fullScreen from '@/components/fullscreen.vue'
import shrinkableMenu from '@/components/shrinkableMenu.vue'

export default {
  name: 'Main',
  components: {
    fullScreen,
    shrinkableMenu
  },
  data () {
    return {
      shrink: false,
      isFullScreen: false,
      menuList: [
        {
          title: '这是第一个菜单',
          name: 'NavigationOne',
          icon: 'ios-analytics',
          children: [
            {
              title: '1-1',
              name: '1-1',
              icon: 'ios-analytics',
              children: [
                {
                  title: '1-1-1',
                  name: '1-1-1',
                  icon: 'ios-analytics',
                  children: []
                },
                {
                  title: '1-1-2',
                  name: '1-1-2',
                  icon: 'ios-analytics',
                  children: []
                },
                {
                  title: '1-1-3',
                  name: '1-1-3',
                  icon: 'ios-analytics',
                  children: []
                }
              ]
            },
            {
              title: '1-2',
              name: '1-2',
              icon: 'ios-analytics',
              children: []
            }
          ]
        },
        {
          title: '这是第二个菜单',
          name: 'NavigationTwo',
          icon: 'ios-filing',
          children: [
            {
              title: '2-1',
              name: '2-1',
              icon: 'ios-analytics',
              children: []
            }
          ]
        },
        {
          title: '这是第三个菜单',
          name: 'NavigationThree',
          icon: 'ios-cog'
          // children: []
        }
      ]
    }
  },
  methods: {
    goHomePage () {
      this.$router.push({
        name: 'home_index'
      })
    }
  }
}
</script>

<style lang="less">
@import './../my-theme/index.less';

.main {
  position: relative;
  padding-top: 50px;
  width: 100%;
  height: 100%;
  .main-top {
    position: fixed;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    background: @primary-color;
    .top-logo {
      float: left;
      height: 50px;
      transition: all 0.3s;
      text-align: center;
      color: #fff;
      font-size: 25px;
      line-height: 50px;
    }
    .top-button {
      font-size: 20px;
      width: 50px;
      height: 50px;
      float: left;
      color: #fff;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      &:hover {
        background:shade(@primary-color, 10%);
      }
    }
  }
  .sidebar-menu-con {
    width: 230px;
    overflow-x: hidden;
    height: 100%;
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 21;
    transition: width 0.3s;
  }
  .single-page-con {
    position: absolute;
    padding: 10px;
    // left:230px;
    width: calc(100vw - 230px);
    height: calc(100vh - 50px);
    top: 50px;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: #f0f0f0;
    z-index: 1;
    transition: all 0.3s;
    .single-page {
      position: relative;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
