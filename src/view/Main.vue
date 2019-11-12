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
      .top-button
        full-screen(v-model="isFullScreen")
    .sidebar-menu-con
      .ivu-shrinkable-menu(:style="'width:'+(!shrink?'230px':'60px')")
        Menu(theme='dark' width='auto')
          Submenu(name='sideMenu')
    .single-page-con(:style="!shrink?'left:230px;width:calc(100vw - 230px);':'left:60px;width:calc(100vw - 60px);'")
      .single-page
        Card
          router-view
</template>

<script>
import fullScreen from '@/components/fullscreen.vue'

export default {
  name: 'Main',
  components: {
    fullScreen
  },
  data: function () {
    return {
      shrink: false,
      isFullScreen: false
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
.main{
    position: relative;
    padding-top: 50px;
    width: 100%;
    height: 100%;
    .main-top{
      position: fixed;
      width: 100%;
      height: 50px;
      top:0;
      left:0;
      background:#17B3A3;
      .top-logo{
        float:left;
        height:50px;
        transition: all .3s;
        text-align: center;
        color:#fff;
        font-size: 25px;
        line-height: 50px;
      }
      .top-button{
        font-size: 20px;
        width:50px;
        height:50px;
        float:left;
        color:#fff;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        &:hover{
          background:#009999
        }
      }
      }
    .sidebar-menu-con{
      width:230px;
      overflow-x: hidden;
      height: 100%;
      position: fixed;
      top: 50px;
      left: 0;
      z-index: 21;
      transition: width .3s;
      .ivu-shrinkable-menu{
        height: 100%;
        width: 100%;
        background:#495060;
        transition: all .3s;
      }
    }
    .single-page-con{
        position: absolute;
        padding:10px;
        // left:230px;
        width:calc(100vw - 230px);
        height:calc(100vh - 50px);
        top: 50px;
        right: 0;
        bottom: 0;
        overflow: auto;
        background-color: #F0F0F0;
        z-index: 1;
        transition: all .3s;
        .single-page{
          position: relative;
          // margin: 10px;
          height: 100%;
          width:100%;
        }
    }
}
</style>
