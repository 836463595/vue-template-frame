import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth' // get token from cookie
import { Message } from 'element-ui'
import getPageTitle from '@/utils/getPageTitle'
/* NProgress */
import NProgress from 'nprogress' // NProgress bar
import 'nprogress/nprogress.css' // NProgress bar style
// 禁用进度环
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // start progress bar
  // NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      //  NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
