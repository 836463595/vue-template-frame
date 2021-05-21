import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// getting
import getters from './getters'

// modules
import setting from './modules/setting'
import user from './modules/user'

export default new Vuex.Store({
  modules: {
    setting,
    user,
  },
  getters,
})

// 另外一种引进modules 方式，避免了`import app from './modules/app'`
/**
 *
 const modulesFiles = require.context('./modules', true, /\.js$/)
 const modules = modulesFiles.keys().reduce((modules, modulePath) => {
   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
   const value = modulesFiles(modulePath)
   modules[moduleName] = value.default
   return modules
 }, {})
 const store = new Vuex.Store({
   modules,
   getters
 })
 */