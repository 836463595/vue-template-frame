<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
        <template>
          <svg-icon v-if="onlyOneChild.meta.icon" :name="onlyOneChild.meta.icon" style="margin-right:16px;font-size:20px" color="#fafafa" />
          <span slot="title">{{ onlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="item.meta.icon" :name="item.meta.icon" style="margin-right:16px;font-size:20px" color="#fafafa" />
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      onlyOneChild: null,
    }
  },
  created() {},
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })

      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-menu-item {
  &.is-active {
    border-right: 4px solid var(--sidebar-active-text-color) !important;
    border-right-color: var(--sidebar-active-text-color) !important;
  }
}
</style>

<style>
.el-menu {
  border: none !important;
}
</style>
