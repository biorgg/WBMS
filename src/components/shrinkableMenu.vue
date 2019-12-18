<template>
  <div class="ivu-shrinkable-menu" :style="'width:'+(!shrink?'230px':'60px')">
    <div v-if="!shrink" class="fade-in">
      <Menu ref="sideMenu" theme="dark" width="auto" accordion :active-name="activeName" :open-names="['1']" @on-select="handleChange">
        <template v-for="(item,index) in menuList" >
          <Submenu v-if="!checkEmptyArray(item.children)" :name="index" :key="item.name">
            <template slot="title">
              <Icon :type="item.icon" />{{item.title}}
            </template>
            <template v-for="ite in item.children" >
              <MenuItem v-if="checkEmptyArray(ite.children)" :key="ite.name" :name="ite.name">
                <Icon :type="ite.icon" :key="ite.name"></Icon>
                {{ite.title}}
              </MenuItem>
              <Submenu v-if="!checkEmptyArray(ite.children)" :key="ite.name" :name="ite.name">
                <template slot="title">
                  <Icon :type="ite.icon" />
                  {{ite.title}}
                </template>
                <MenuItem v-for="iite in ite.children" :key="iite.name" :name="iite.title">
                  <Icon :type="iite.icon" />
                  {{iite.name}}
                </MenuItem>
              </Submenu>
            </template>
          </Submenu>
          <MenuItem v-if="checkEmptyArray(item.children)" :key="item.name" :name="item.name">
            <Icon :type="item.icon" :key="item.name"/>
            {{item.title}}
          </MenuItem>
        </template>
      </Menu>
    </div>
    <div v-if="shrink" class="fade-in2">
      <template v-for="(item,index) in menuList" >
      <Dropdown transfer placement="right-start" :key="index" @on-click="handleChange">
        <div class="menu-button">
          <Icon :size="20" color="white" :type="item.icon"></Icon>
        </div>
        <template v-if="!checkEmptyArray(item.children)" v-for="(child, i) in item.children">
            <DropdownMenu slot="list" :key="i">
                <DropdownItem v-if="checkEmptyArray(child.children)" :name="child.name">
                  <Icon type="ios-play"></Icon>
                  <span style="padding-left:10px;">{{ child.title }}</span>
                </DropdownItem>
                <Dropdown v-else transfer placement="right-start">
                  <DropdownItem>
                      <Icon type="ios-play"></Icon>
                      <span style="padding-left:10px;">{{ child.title }}</span>
                      <Icon style="padding-left:10px;" type="ios-arrow-forward"></Icon>
                  </DropdownItem>
                  <DropdownMenu slot="list" :key="i">
                    <DropdownItem  v-for="(iite,ii) in child.children" :key="ii" :name="iite.name">
                      <Icon type="ios-play"></Icon>
                      <span style="padding-left:10px;">{{ iite.title }}</span>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
            </DropdownMenu>
        </template>
        <template v-if="checkEmptyArray(item.children)">
          <DropdownMenu slot="list">
            <DropdownItem :name="item.name" :key="index">
              <Icon type="ios-play"></Icon>
              <span style="padding-left:10px;">{{ item.title }}</span>
            </DropdownItem>
          </DropdownMenu>
        </template>
      </Dropdown>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shrinkableMenu',
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeName: ''
    }
  },
  updated () {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened()
      }
    })
    this.activeName = this.$route.name
  },
  methods: {
    checkEmptyArray (arr) {
      return !(arr && arr instanceof Array && arr.length > 0)
    },
    handleChange (name) {
      this.$router.push({
        name: name
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-shrinkable-menu {
  height: 100%;
  width: 100%;
  background: #495060;
  transition: all 0.3s;

  .menu-button{
    width:60px;
    height:60px;
    line-height:60px;
    text-align:center;
    cursor: pointer;
      &:hover {
        background:shade(#495060, 10%);
      }
  }

  .fade-in{
    animation:fdAm .8s;
      @keyframes fdAm{
        0%   {opacity:0;}
        30%  {opacity:0;}
        100% {opacity:1;}
      }
    }
  .fade-in2{
    animation:fdAm2 .8s;
      @keyframes fdAm2{
        0%   {opacity:0;}
        30%  {opacity:0;}
        100% {opacity:1;}
      }
    }
  }
</style>
