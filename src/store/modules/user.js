import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  menus: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log('登陆成功')
    let token = 'successToken'
    commit('SET_TOKEN', token)
    setToken(token)
    // resolve()
  },

  // get userinfo
  getInfo({ commit }, state) {
    const menus = [
      {
        path: '/books',
        component: 'Layout',
        children: [
          {
            path: 'index',
            name: 'AddressBook',
            component: 'workbench/addressbook',
            meta: { title: '通讯录', icon: 'company' },
          },
        ],
      },
      {
        path: '/systool',
        component: 'Layout',
        redirect: '/systool/coder',
        name: 'SysTool',
        meta: { title: '实验室', icon: 'example' },
        children: [
          {
            path: 'calendar',
            name: 'Calendar',
            component: 'workbench/calendar',
            meta: { title: '日程', icon: 'table' },
          },
        ],
      },
    ]

    commit('SET_MENUS', menus)
  },

  // user logout
  logout({ commit, state, dispatch }) {
    console.log('退出登陆')

    commit('SET_TOKEN', '')
    removeToken()
    // resetRouter()
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
