import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/layout'

//   modules
import alarmManagementRouter from './modules/alarmManagement'
import nested from './modules/nested'

/**
 * constantRoutes
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: 'Home', icon: 'iconuser' },
      },
    ],
  },
  alarmManagementRouter,
  nested,
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '/about',
        component: () => import('@/views/about/index'),
        name: 'About',
        meta: { title: 'About', icon: 'iconnotice' },
      },
    ],
  },
]

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

//  重置
export function resetRouter() {
  const newRouter = router
  router.matcher = newRouter.matcher // reset router
}

export default router
