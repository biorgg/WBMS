<template lang="pug">
  .main
    .sidebar-menu-con
      .ivu-shrinkable-menu
        Menu(theme='dark')
          Submenu(name='sideMenu')
    .main-header-con
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
    position: absolute;
    width: 100%;
    height: 100%;
    .sidebar-menu-con{
        height: 100%;
        position: fixed;
        top: 0;
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
        top: 65px;
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
