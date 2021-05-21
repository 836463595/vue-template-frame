import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//  路由配置
import './utils/permission'

//Element
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui'
Vue.use(Element)
Vue.prototype.$message = Message

// 全局注册过滤器
import * as filters from './filters' // global filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// style
import '@/styles/index.scss' // global css

// SvgIcon
import SvgIcon from 'vue-svgicon'
import '@/icons/components'
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
