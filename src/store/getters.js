const getters = {
  // 侧边导航栏设置
  sidebar: (state) => state.setting.sidebar,
  // 设设备类型
  device: (state) => state.setting.device,
  // 路由菜单
  menus: (state) => state.user.menus,
}

export default getters
