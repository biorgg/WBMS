<template lang="pug">
  .main
    .main-top
    .sidebar-menu-con
      .ivu-shrinkable-menu
        Menu(theme='dark' width='auto')
          Submenu(name='sideMenu')
    .single-page-con
      .single-page
        router-view
</template>

<script>
export default {
  name: 'Main'
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
          background:#495060
        }
    }
    .single-page-con{
        position: absolute;
        left:230px;
        width:calc(100vw - 230px);
        height:calc(100vh - 50px);
        top: 50px;
        right: 0;
        bottom: 0;
        overflow: auto;
        background-color: #F0F0F0;
        z-index: 1;
        transition: left .3s;
        .single-page{
            margin: 10px;
        }
    }
}
</style>
