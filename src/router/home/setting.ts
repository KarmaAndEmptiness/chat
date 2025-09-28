import type { RouteRecordRaw } from 'vue-router';

const settingRoutes:RouteRecordRaw = {
  path: '/settings',
  name: 'settings',
  meta: { auth: true, title: '设置' },
  redirect: '/settings/detail',
  component: () => import('@/views/setting/Layout.vue'),
  children: [
    {
      path: '/settings/detail',
      meta: { auth: true },
      component: () => import('@/views/setting/Detail.vue')
    }
  ]
}

export default settingRoutes;