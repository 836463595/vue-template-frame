import Cookies from 'js-cookie'

/**
 *
 * @param {sidebar} opened 侧边栏是否开启
 * @param {sidebar} withoutAnimation 是否需要动画
 * @param {device}  Desktop_Mobile  设备类型
 *
 */

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
  },
  device: 'Desktop',
}

const mutations = {
  OPEN_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  CHANHE_DEVICE: (state, device) => {
    state.device = device
  },
}

const actions = {
  openSidebar({ commit }) {
    commit('OPEN_SIDEBAR')
  },
  closeSidebar({ commit }, withoutAnimation) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  changeDevice({ commit }, device) {
    commit('CHANHE_DEVICE', device)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
