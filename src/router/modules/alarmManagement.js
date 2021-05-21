import Layout from '@/layout'

const alarmManagementRouter = {
  path: '/alarmManagement',
  component: Layout,
  redirect: 'noRedirect',
  name: 'alarmManagement',
  meta: {
    title: 'AlarmManage',
    icon: 'icondaohang',
  },
  children: [
    {
      path: 'aultAlarm',
      name: 'aultAlarm',
      meta: {
        title: 'aultAlarm',
      },
      component: () => import('@/views/alarmManagement/faultAlarm'),
    },
    {
      path: 'emissionAlarm',
      name: 'emissionAlarm',
      meta: {
        title: 'emissionAlarm',
      },
      component: () => import('@/views/alarmManagement/emissionAlarm'),
    },
  ],
}
export default alarmManagementRouter
