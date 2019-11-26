<template>
  <div id="app" :class="myTheme">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    myTheme () {
      return this.$store.state.user.theme
    }
  },
  created () {

  }
}
</script>

<style lang="less">
@import './my-theme/index.less';
</style>
