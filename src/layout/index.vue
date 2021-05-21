<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device === 'Mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div class="sidebar-container">
      <div class="sidebar-logo-container" :class="{ collapse: isCollapse }">
        <transition name="sidebarLogoFade">
          <router-link key="collapse" class="sidebar-logo-link" to="/">
            <div v-if="!isCollapse">
              <img src="@/assets/images/logo1.png" class="sidebar-logo" />
              <h1 class="sidebar-title">{{ title }}</h1>
            </div>
            <div v-else>
              <img src="@/assets/images/logo1.png" class="sidebar-logo" />
            </div>
          </router-link>
        </transition>
      </div>
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          unique-opened
          :default-active="activeMenu"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :active-text-color="variables.menuActiveText"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          mode="vertical"
        >
          <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
      </el-scrollbar>
    </div>

    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <div class="navbar">
          <div class="hamburger-container" @click="toggleSideBar">
            <svg-icon :name="sidebar.opened ? 'iconzhankai' : 'iconshouqi'" class="fs-30 " />
          </div>

          <div class="flex flex-row j-end a-center" style="height:50px;margin-right:10px">
            <div class="">
              <el-badge is-dot>
                <svg-icon name="iconnotice" style="font-size: 25px; cursor: pointer" />
              </el-badge>
            </div>
            <div class="ml-5">
              <img src="../assets/man_ico.png" style="width:30px;height:30px" />
            </div>
            <div class="ml-5" style="display:inline-block">
              <el-dropdown>
                <span class="el-dropdown-link">
                  Administrator
                  <i class="el-icon-arrow-down ml-5"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="mt-2">
                <span class="caption">2020-12-15 12:00 登录</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import ResizeMixin from './mixin/resizeHandles'

import variables from '@/styles/base.scss'
import SidebarItem from './components/SidebarItem'

import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  mixins: [ResizeMixin],
  components: { SidebarItem },
  data() {
    return {
      title: 'Vue Template Frame',
      collapse: true,
      fixedHeader: false,
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'device']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    routes() {
      return this.$router.options.routes
    },
    variables() {
      return variables
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'Mobile',
      }
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
  mounted() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch('setting/openSidebar')
    },
    handleClickOutside() {
      this.$store.dispatch('setting/closeSidebar', { withoutAnimation: false })
    },
  },
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #fafafa;
  // min-width: $min-width;
  // min-height: $min-height;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 64px;
    padding: 0 10px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
}

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
.caption {
  font-size: 13px;
  color: #9e9d9d;
}
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
